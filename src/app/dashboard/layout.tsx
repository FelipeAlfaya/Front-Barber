'use client';

import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import fetchMe from './_actions';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [type, setType] = useState<'Client' | 'Barber'>('Client');

  const getMe = useCallback(
    async (token: string) => {
      await fetchMe(token).then(res => {
        if (!res.data.id) {
          alert(res.data.error || 'Sessão expirada, faça login novamente.');
          router.push('/');
          return;
        }

        localStorage.setItem('user', JSON.stringify(res.data));

        if (res.data.type === 'Barber') {
          router.push('/dashboard/barbeiro');
          setType('Barber');
          return;
        }
      });
    },
    [router],
  );

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
      return;
    }

    getMe(token);
  }, [router, getMe]);

  return (
    <>
      <Navbar type={type} />
      {children}
    </>
  );
}
