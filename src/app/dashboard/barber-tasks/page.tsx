'use client';

import { useRouter } from 'next/router';
import { useCallback } from 'react';
import fetchMe from '../_actions';
import { toast } from 'react-toastify';

function Tasks() {
  // const router = useRouter();

  // const getMe = useCallback(
  //   async (token: string) => {
  //     await fetchMe(token).then(res => {
  //       if (!res.data.id) {
  //         toast.error(
  //           res.data.error || 'Sessão expirada, faça login novamente.',
  //         );
  //         router.push('/');
  //         return;
  //       }

  //       localStorage.setItem('user', JSON.stringify(res.data));

  //       if (res.data.type === 'Client') {
  //         router.push('/dashboard');
  //         return;
  //       }
  //     });
  //   },
  //   [router],
  // );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
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

          <form className="mt-10" method="POST">
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
              type="text"
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
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
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
