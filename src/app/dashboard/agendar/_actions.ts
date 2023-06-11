'use server';

export default async function fetchAppointment(data: {
  barber: number;
  date: string;
  time: string;
  tasks: number[];
  token: string | null;
}) {
  const res = await fetch('http://localhost:3030/appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      barber: data.barber,
      date: data.date.substring(0, 10),
      time: data.time,
      tasks: data.tasks,
    }),
    cache: 'no-cache',
  });

  if (res.status < 200 || res.status >= 300) {
    return {
      data: {
        error: 'Erro ao agendar horário.',
      },
    };
  }

  return {
    data: await res.json(),
  };
}
