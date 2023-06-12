'use client';

import Select from '@/components/Select';
import { Barber } from '@/interfaces/barber';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';
import fetchAppointment from './_actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { time } from 'console';

export default function Page() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [barber, setBarber] = useState<Barber>();
  const [horario, setHorario] = useState<{
    id: number;
    name: string;
  }>();
  const [date, setDate] = useState<string>('');
  const [tasks, setTasks] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [sucessMessage, setSucessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const getBarbers = useCallback(async () => {
    await fetch('/api/barbers', {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(barbers => {
        setBarbers(barbers);
      })
      .finally(() => {
        setIsMounted(true);
      });
  }, []);

  const onSelectTask = (id: number) => {
    if (tasks.includes(id)) {
      setTasks(tasks.filter(task => task !== id));
    } else {
      setTasks([...tasks, id]);
    }
  };

  useEffect(() => {
    getBarbers();
  }, [getBarbers]);

  useEffect(() => {
    if (barber) {
      setTasks([]);
    }
  }, [barber]);

  useEffect(() => {
    if (sucessMessage) {
      toast.success(sucessMessage);
      setSucessMessage('');
    } else if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage('');
    }
  }, [sucessMessage, errorMessage]);

  if (!isMounted) {
    return null;
  }

  const handleSubmit = () => {
    const token = localStorage.getItem('token');

    if (!horario) {
      setErrorMessage('Você precisa selecionar um horário');
      return;
    }

    if (!date) {
      setErrorMessage('Você precisa selecionar uma data');
      return;
    }

    if (!tasks.length) {
      setErrorMessage('Você precisa selecionar um serviço');
      return;
    }

    startTransition(async () => {
      await fetchAppointment({
        barber: barber!.id,
        time: horario.name,
        tasks,
        token,
        date,
      }).then(res => {
        if (res.data.id) {
          setSucessMessage('Agendamento realizado com sucesso!');
        } else {
          setErrorMessage(res.data.error);
        }
      });
    });
  };

  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };

  return (
    <>
      {(barber && (
        <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8 bg-white rounded-2xl mt-24">
          <button className="mb-8" onClick={() => setBarber(undefined)}>
            Voltar
          </button>
          <div className="mb-8">
            <Select
              selected={horario}
              setSelected={setHorario}
              title="Horário"
              options={[
                {
                  id: 1,
                  name: '10:00',
                },
                {
                  id: 1,
                  name: '11:00',
                },
                {
                  id: 1,
                  name: '12:00',
                },
                {
                  id: 1,
                  name: '13:00',
                },
                {
                  id: 1,
                  name: '14:00',
                },
                {
                  id: 1,
                  name: '15:00',
                },
                {
                  id: 1,
                  name: '16:00',
                },
                {
                  id: 1,
                  name: '17:00',
                },
                {
                  id: 1,
                  name: '18:00',
                },
              ]}
            />
          </div>
          <div className="mb-8">
            <h1 className="font-bold">Data</h1>
            <input
              onChange={handleDateChange}
              value={date}
              type="date"
              placeholder="Nome"
              className="input"
            />
          </div>
          <>
            <h1 className="font-bold mb-4">Serviços</h1>
            {(barber.tasks.length &&
              barber.tasks.map(task => {
                return (
                  <>
                    <div key={task.id} className="mb-8 flex justify-between">
                      <div className="flex">
                        <input
                          onChange={() => onSelectTask(task.id)}
                          type="checkbox"
                          name={`task-${task.id}`}
                          className="checkbox"
                        />
                        <label htmlFor={`task-${task.id}`} className="ml-4">
                          {task.description}
                        </label>
                      </div>
                      <span className="font-bold">R$ {task.price}</span>
                    </div>
                  </>
                );
              })) || (
              <div className="text-center">
                <p className="text-gray-500">Nenhum serviço encontrado</p>
              </div>
            )}
            <button
              onClick={handleSubmit}
              type="button"
              className="mt-8 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Confirmar
            </button>
          </>
        </div>
      )) || (
        <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8 bg-white rounded-2xl mt-24">
          <h1 className="text-3xl font-bold">Nossos barbers</h1>
          <ul role="list" className="divide-y divide-gray-100">
            {(barbers.length &&
              barbers.map(barber => (
                <li
                  key={barber.id}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex items-center">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {barber.name}
                      </p>
                    </div>
                  </div>
                  <div className="sm:flex sm:flex-col sm:items-end">
                    <button
                      onClick={() => setBarber(barber)}
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Agendar
                    </button>
                  </div>
                </li>
              ))) || (
              <h1 className="mt-8">
                Nenhum barbeiro encontrado. <br />
              </h1>
            )}
          </ul>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
