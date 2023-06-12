'use server';

export default async function fetchTasks(data: FormData) {
  const token = localStorage.getItem('token');
  const description = data.get('description');
  const price = data.get('price');

  if (!description || !price) {
    return {
      data: {
        error: 'Descrição e preço são obrigatórios',
      },
    };
  }

  const res = await fetch('http://localhost:3030/task', {
    method: 'POST',
    body: JSON.stringify({
      description,
      price,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
