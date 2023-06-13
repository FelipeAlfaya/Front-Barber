'use server';

import { Appointment } from '@/interfaces/barber';

export default async function fetchMyAppointments(token: string): Promise<{
  data:
    | Appointment[]
    | {
        error: string;
      };
}> {
  const res = await fetch('http://localhost:3030/appointment/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60,
    },
  });

  if (res.status < 200 || res.status >= 300) {
    return {
      data: {
        error: 'Erro ao carregar dados.',
      },
    };
  }

  return {
    data: await res.json(),
  };
}

export async function fetchDelete(token: string, id: number) {
  const res = await fetch(`http://localhost:3030/appointment/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  if (res.status < 200 || res.status >= 300) {
    return {
      data: {
        error: 'Erro ao carregar dados.',
      },
    };
  }

  return {
    data: await res.json(),
  };
}
