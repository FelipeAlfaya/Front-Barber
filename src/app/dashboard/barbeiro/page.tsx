'use client';

import { User } from '@/interfaces/user';
import { useCallback, useEffect, useState } from 'react';
import fetchMe from '../_actions';
import { useRouter } from 'next/navigation';
import fetchMyAppointments from './_actions';
import { Appointment } from '@/interfaces/barber';
import Image from 'next/image';

function BarberTime() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const getMyAppointments = useCallback(async (token: string) => {
    await fetchMyAppointments(token).then(res => {
      if (res.data instanceof Array) {
        setAppointments(res.data);
      }
    });
  }, []);

  const getMe = useCallback(
    async (token: string) => {
      await fetchMe(token).then(res => {
        if (!res.data.id) {
          alert(res.data.error || 'Sessão expirada, faça login novamente.');
          router.push('/');
          return;
        }

        localStorage.setItem('user', JSON.stringify(res.data));

        if (res.data.type === 'Client') {
          router.push('/dashboard');
          return;
        }
      });
    },
    [router],
  );

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
      return;
    }

    getMe(token);
    getMyAppointments(token);
  }, [router, getMe, getMyAppointments]);

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8 bg-white rounded-2xl mt-12">
      <ul role="list" className="divide-y divide-gray-100">
        {appointments.map(appointments => (
          <li
            key={appointments.id}
            className="flex justify-between gap-x-6 py-5"
          >
            <div className="flex gap-x-4">
              <Image
                className="rounded-full"
                width={48}
                height={48}
                src={appointments.client.avatar || '/logo.jpeg'}
                alt={appointments.client.name}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {appointments.client.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {appointments.client.email}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {appointments.time}
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BarberTime;
