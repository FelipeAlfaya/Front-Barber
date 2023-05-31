'use client';

import Select from '@/components/Select';
import { Barber } from '@/interfaces/barber';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

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

  const getBarbers = useCallback(async () => {
    await fetch('/api/barbers')
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

  if (!isMounted) {
    return null;
  }

  const handleSubmit = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa estar logado para agendar um horário');
      return;
    }

    if (!horario) {
      alert('Você precisa selecionar um horário');
      return;
    }

    if (!tasks.length) {
      alert('Você precisa selecionar um serviço');
      return;
    }

    fetch('http://localhost:3030/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        barber: barber?.id,
        date: date?.toString(),
        time: horario.name,
        tasks,
      }),
    });

    console.log({
      barber: barber?.id,
      date: date.toString(),
      time: horario.name,
      tasks,
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
                          className="checkbox"
                        />
                        <span className="ml-2">{task.description}</span>
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
                    <Image
                      className="rounded-full"
                      width={48}
                      height={48}
                      src={barber.avatar || '/logo.jpeg'}
                      alt={barber.name}
                    />

                    <div className="min-w-0 flex items-center">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {barber.name}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
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
    </>
  );
}
