'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useTransition } from 'react';
import fetchMe from '../_actions';
import { toast } from 'react-toastify';
import fetchTasks from './actions';

function Tasks() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const getMe = useCallback(
    async (token: string) => {
      await fetchMe(token).then(res => {
        if (!res.data.id) {
          toast.warn(
            res.data.error || 'Sessão expirada, faça login novamente.',
          );
          router.push('/');
          return;
        }

        localStorage.setItem('user', JSON.stringify(res.data));

        if (res.data.type === 'Client') {
          router.push('/dashboard');
          return;
        }
      });
    },
    [router],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
      return;
    }

    const description = (
      document.getElementById('description') as HTMLInputElement
    ).value;
    const priceString = (document.getElementById('price') as HTMLInputElement)
      .value;
    const price = parseFloat(priceString);

    startTransition(async () => {
      const res = await fetchTasks({
        description,
        price,
        token,
      });

      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }

      toast.success('Serviço cadastrado com sucesso!');
      router.push('/dashboard/barbeiro');
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
      return;
    }

    getMe(token);
  }, [router, getMe]);

  return (
    <div className="flex flex-col h-screen bg-[#172740]">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="flex"></div>

        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-2xl lg:text-3xl text-gray-800">
            Registrar serviços
          </h2>

          <form className="mt-10" onSubmit={handleSubmit}>
            <label className="block text-xs font-semibold text-gray-600 uppercase">
              Título
            </label>
            <input
              id="description"
              type="description"
              name="text"
              placeholder="Título do serviço"
              className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              Preço
            </label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="Preço"
              className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Confirmar registro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
