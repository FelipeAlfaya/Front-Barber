'use client';

import Select from '@/components/Select';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Fragment, useState } from 'react';

const barbers = [
  {
    id: 1,
    name: 'Marcus Araújo',
    avatar: '/logo.jpeg',
  },
  {
    id: 2,
    name: 'Eduardo Guimarães',
    avatar: '/logo.jpeg',
  },
  {
    id: 3,
    name: 'Marcelo Tas',
    avatar: '/logo.jpeg',
  },
  {
    id: 4,
    name: 'Dr. Drauzio Varella',
    avatar: '/logo.jpeg',
  },
  {
    id: 5,
    name: 'Danilo Gentili',
    avatar: '/logo.jpeg',
  },
  {
    id: 6,
    name: 'Monark',
    avatar: '/logo.jpeg',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Page() {
  const [barber, setBarber] = useState<{
    id: number;
    name: string;
    avatar: string;
  }>();

  const [horario, setHorario] = useState<{
    id: number;
    name: string;
  }>();

  if (barber) {
    return (
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
                id: 2,
                name: '11:00',
              },
              {
                id: 3,
                name: '12:00',
              },
              {
                id: 3,
                name: '13:00',
              },
              {
                id: 3,
                name: '14:00',
              },
              {
                id: 3,
                name: '15:00',
              },
              {
                id: 3,
                name: '16:00',
              },
              {
                id: 3,
                name: '17:00',
              },
              {
                id: 3,
                name: '18:00',
              },
            ]}
          />
        </div>
        <div className="mb-8">
          <input type="text" placeholder="Nome" className="input" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8 bg-white rounded-2xl mt-24">
      <h1 className="text-3xl font-bold">Nossos barbers</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {barbers.map(barber => (
          <li key={barber.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <Image
                className="rounded-full"
                width={48}
                height={48}
                src={barber.avatar}
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
        ))}
      </ul>
    </div>
  );
}
