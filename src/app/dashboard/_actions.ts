'use server';

export default async function fetchMe(token: string) {
  const res = await fetch('http://localhost:3030/user/me', {
    method: 'GET',
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
