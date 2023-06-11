'use server';

import { Appointment } from '@/interfaces/barber';

export default async function fetchMyAppointments(token: string): Promise<{
  data: Appointment[];
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

export async function fetchDelete(token: string) {
  const res = await fetch('http://localhost:3030/appointment/me', {
    method: 'DELETE',
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
