'use server';

export async function fetchRegister(data: FormData) {
  const name = data.get('name');
  const email = data.get('email');
  const password = data.get('password');
  const password_confirmation = data.get('password_confirmation');

  if (!name || !email || !password || !password_confirmation) {
    return {
      data: {
        error: 'nome, email e senha são obrigatórios',
      },
    };
  }

  if (password !== password_confirmation) {
    return {
      data: {
        error: 'senha e confirmação de senha não conferem',
      },
    };
  }

  const res = await fetch('http://localhost:3030/user', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
      type: 'client',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });

  return {
    data: await res.json(),
  };
}
