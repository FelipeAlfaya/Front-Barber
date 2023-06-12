'use server';

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
