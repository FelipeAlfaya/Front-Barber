'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition, useState } from 'react';
import { fetchRegister } from './_actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (credentials: FormData) => {
    startTransition(() => {
      fetchRegister(credentials)
        .then((res) => {
          if (res.data.token) {
            router.push('/');
          } else if (res.data.success) {
            setSuccessMessage(res.data.success);
            setTimeout(() => {
              router.push('/');
            }, 5001);
          } else {
            toast.error(res.data.error);
          }
        })
        .catch((error) => {
          toast.error('Ocorreu um erro ao realizar o registro');
        });
    });
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setSuccessMessage('');
    }
  }, [successMessage]);

  const [tasks, setTasks] = useState([
    {
      id: 2,
      description: 'navalhado',
      price: 15,
      selected: false
    },
    {
      id: 3,
      description: 'sobrancelha',
      price: 5,
      selected: false
    },
    {
      id: 4,
      description: 'barba',
      price: 5,
      selected: false
    },
    {
      id: 5,
      description: 'completo',
      price: 23,
      selected: false
    },
  ]);

  const handleTaskSelection = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, selected: !task.selected } : task
      )
    );
  };

  const handleSelectAll = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, selected: true }))
    );
  };

  const handleSelectNone = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, selected: false }))
    );
  };

  return (
    <>
      <div className="h-screen flex">
        <div
          className="hidden lg:flex w-full lg:w-1/2 login_img_section
      justify-around items-center"
        >
          <div
            className=" 
              bg-black 
              opacity-20 
              inset-0 
              z-0"
          ></div>
          <div className="inset-0 flex justify-center w-full mx-auto px-20 flex-col items-center space-y-6 ">
            <h1 className="text-white font-bold text-4xl font-sans">
              <Image
                src="/logo.jpeg"
                width={450}
                height={450}
                alt=""
                className="rounded-full"
              />
            </h1>
            <p className="text-white mt-1 font-semibold">
              O estilo do seu cabelo é o nosso estilo de vida!
            </p>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form
              action={handleSubmit}
              className="bg-white rounded-md shadow-2xl p-5"
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Olá!</h1>
              <p className="text-sm font-normal text-gray-600 mb-8">
                Cadastro de barbeiro
              </p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="name"
                  className=" pl-2 w-full outline-none border-none"
                  type="text"
                  name="name"
                  placeholder="Nome do barbeiro"
                />
              </div>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="email"
                  className=" pl-2 w-full outline-none border-none"
                  type="email"
                  name="email"
                  placeholder="Endereço de email"
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 w-full outline-none border-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Senha"
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 w-full outline-none border-none"
                  type="password"
                  name="password-confirmation"
                  id="password-confirmation"
                  placeholder="Confirme sua senha"
                />
              </div>

              <div className="mb-8">
                <p className="font-semibold">Tarefas:</p>
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.selected}
                      onChange={() => handleTaskSelection(task.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`task-${task.id}`}>{task.description}</label>
                  </div>
                ))}
                <div>
                  <button type="button" onClick={handleSelectAll} className="mr-2">
                    Selecionar Todos
                  </button>
                  <button type="button" onClick={handleSelectNone}>
                    Selecionar Nenhum
                  </button>
                </div>
              </div>

              <button
                disabled={isPending}
                type="submit"
                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Confirmar cadastro
              </button>
              <div className="flex justify-between mt-4">
                <Link
                  href="#"
                  className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                >
                  Voltar ao dashboard? <Link href="/barbeiro"></Link>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Page;
