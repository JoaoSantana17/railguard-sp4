'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '../Components/Sidebar';
import { Train } from 'lucide-react';

export default function Linha8() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />

      <main className="flex-1 p-12">
        <header className="mb-10">
          <h1 className="text-5xl font-extrabold">Linha 8 - Diamante</h1>
          <p className="mt-2 text-xl text-gray-600 font-semibold">Selecione o vagão para monitorar as câmeras e alertas.</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 8 }, (_, i) => (
            <button
              key={i}
              onClick={() => router.push(`/vagao/${i + 1}`)}
              className="flex flex-col items-center justify-center gap-3 p-8 bg-white rounded-2xl shadow-md border border-gray-300 transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label={`Vagão ${i + 1}`}
            >
              <Train size={48} className="text-teal-600" />
              <span className="text-3xl font-bold text-gray-900">Vagão {i + 1}</span>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}

