'use server';

export async function fetchLogin(data: FormData): Promise<{
  data: {
    token?: string;
    error?: string;
  };
}> {
  const email = data.get('email');
  const password = data.get('password');

  if (!email || !password) {
    return {
      data: {
        error: 'email e senha são obrigatórios',
      },
    };
  }

  const res = await fetch('http://localhost:3030/auth', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
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
