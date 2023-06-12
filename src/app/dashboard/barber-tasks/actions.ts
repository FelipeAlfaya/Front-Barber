'use server';

export default async function fetchTasks(data: {
  token: string | null;
  description: string;
  price: number;
}) {
  const res = await fetch('http://localhost:3030/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      description: data.description,
      price: data.price,
    }),
    cache: 'no-cache',
  });

  if (res.status < 200 || res.status >= 300) {
    return {
      data: {
        error: 'Erro ao cadastrar tarefa.',
      },
    };
  }

  if (res.status === 201 || 200) {
    return {
      data: {
        success: 'Tarefa cadastrada com sucesso.',
      },
    };
  }

  return {
    data: await res.json(),
  };
}
