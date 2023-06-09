'use client';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { User } from '../interfaces/user';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ type }: { type: 'Client' | 'Barber' }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User>();

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/');
    return;
  }

  const navigation = {
    Client: [
      { name: 'Início', href: '/dashboard' },
      { name: 'Agendar horário', href: '/dashboard/agendar' },
      { name: 'Meus agendamentos', href: '/dashboard/meus-agendamentos' },
    ],
    Barber: [
      { name: 'Agendamentos', href: '/dashboard/barbeiro' },
      {
        name: 'Cadastrar novo barbeiro',
        href: '/dashboard/cadastrar-barbeiro',
      },
      {
        name: 'Meus serviços',
        href: '/dashboard/barber-tasks',
      },
    ],
  };

  const fetchMyProfile = useCallback(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
      return;
    }

    fetch(`http://localhost:3030/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((res: User) => {
        if (!res.id) {
          router.push('/');
          return;
        }

        setUser(res);
      });
  }, [router]);

  useEffect(() => {
    fetchMyProfile();
  }, [fetchMyProfile]);

  return (
    <>
      <div className="min-h-full shadow-md">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        src="/logo.jpeg"
                        width={48}
                        height={48}
                        alt=""
                        className="rounded-full"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4 text-white">
                        {navigation[type].map(item => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              pathname === item.href
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              src="/profile-icon-9.png"
                              width={48}
                              height={48}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <button
                                onClick={handleLogout}
                                className="block px-4 py-2 text-sm text-[#1a1a1a] hover:text-red-600 duration-300"
                              >
                                Sair
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="ml-1 flex items-baseline space-x-4 text-white text-sm">
                  {navigation[type].map(item => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      href={item.href}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {' '}
                      <Image
                        src="/profile-icon-9.png"
                        width={48}
                        height={48}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      as="span"
                      onClick={handleLogout}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sair
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
