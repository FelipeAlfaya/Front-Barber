'use server';

export async function fetchRegister(data: FormData) {
  const name = data.get('name');
  const email = data.get('email');
  const password = data.get('password');
  const password_confirmation = data.get('password-confirmation');

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
      type: 'barber',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });

  if (res.status < 200 || res.status >= 300) {
    return {
      data: {
        error: 'Erro ao cadastrar barbeiro.',
      },
    };
  }

  if (res.status === 201) {
    return {
      data: {
        success: 'Barbeiro cadastrado com sucesso.',
      },
    };
  }

  return {
    data: await res.json(),
  };
}
