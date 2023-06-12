'use client';

import { Appointment } from '@/interfaces/barber';
import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import fetchMe from '../_actions';
import fetchMyAppointments from './_actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BarberTime() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [sucessMessage, setSucessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getMyAppointments = useCallback(async (token: string) => {
    await fetchMyAppointments(token).then(res => {
      if (res.data instanceof Array) {
        setAppointments(res.data.sort((a, b) => a.time.localeCompare(b.time)));
      }
    });
  }, []);

  const getMe = useCallback(
    async (token: string) => {
      await fetchMe(token).then(res => {
        if (!res.data.id) {
          setErrorMessage(
            res.data.error || 'Sessão expirada, faça login novamente.',
          );
          router.push('/');
          return;
        }

        localStorage.setItem('user', JSON.stringify(res.data));
      });
    },
    [router],
  );

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
      return;
    } else if (sucessMessage) {
      toast.success(sucessMessage);
      setSucessMessage('');
    } else if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage('');
    }

    getMe(token);
    getMyAppointments(token);
  }, [router, getMe, getMyAppointments, sucessMessage, errorMessage]);

  const deleteAppointment = useCallback(
    async (appointmentId: number) => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/');
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3030/appointment/${appointmentId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200 || 201) {
          getMyAppointments(token);
          setSucessMessage('Appointment excluído com sucesso.');
        } else {
          const data = await response.json();
          setErrorMessage(data.error + '\nErro ao excluir o appointment.');
        }
      } catch (error) {
        console.error('Erro ao excluir o appointment:', error);
        setErrorMessage(
          'Erro ao excluir o appointment. Verifique a conexão com o servidor.',
        );
      }
    },
    [router],
  );

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8 bg-white rounded-2xl mt-12">
      <h1 className="font-semibold text-gray-900">Meus agendamentos</h1>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">Sem agendamentos</p>
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {appointments.map(appointments => (
            <li
              key={appointments.id}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4 ">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {appointments.client.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {appointments.client.email}
                  </p>
                </div>
              </div>
              <div className="sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {' '}
                  {new Date(appointments.date).toLocaleDateString(
                    'pt-BR',
                  )} às {appointments.time}
                </p>
                {appointments.created_at ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Agendado em{' '}
                    <span>
                      {new Date(appointments.created_at).toLocaleDateString(
                        'pt-BR',
                      )}
                    </span>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>
              <TrashIcon
                className="w-6 h-6 text-red-400 cursor-pointer"
                onClick={() => {
                  setAppointments((oldAppointments: Appointment[]) =>
                    oldAppointments.filter(
                      appointment => appointment.id !== appointments.id,
                    ),
                  );
                  deleteAppointment(appointments.id);
                }}
              />
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
}

export default BarberTime;
