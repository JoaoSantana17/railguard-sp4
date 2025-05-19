'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../Components/Sidebar';
import { Train, AlertTriangle } from 'lucide-react';

export default function Monitoramento() {
  const [selectedLine, setSelectedLine] = useState('Linha 8 - Diamante');
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Monitoramento</h1>
        <p className="text-xl text-gray-700 mb-8">Selecione uma linha para visualizar as câmeras de segurança.</p>

        {/* Cards de Seleção de Linha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            onClick={() => {
              setSelectedLine('Linha 8 - Diamante');
              router.push('/linha8');
            }}
            className={`cursor-pointer p-6 rounded-2xl shadow-md border transition-all hover:scale-105
              ${selectedLine === 'Linha 8 - Diamante' ? 'bg-teal-600 text-white' : 'bg-white border-gray-300'}
              hover:bg-gray-200`}
          >
            <div className="flex items-center gap-4">
              <Train size={36} className="text-inherit" />
              <h2 className="text-2xl font-bold">Linha 8 - Diamante</h2>
            </div>
            <p className="mt-2 text-lg">Câmeras e alertas em tempo real da Linha 8.</p>
          </div>

          <div
            onClick={() => {
              setSelectedLine('Linha 9 - Esmeralda');
              router.push('/linha9');
            }}
            className={`cursor-pointer p-6 rounded-2xl shadow-md border transition-all hover:scale-105
              ${selectedLine === 'Linha 9 - Esmeralda' ? 'bg-teal-600 text-white' : 'bg-white border-gray-300'}
              hover:bg-emerald-600 hover:text-white`}
          >
            <div className="flex items-center gap-4">
              <Train size={36} className="text-inherit" />
              <h2 className="text-2xl font-bold">Linha 9 - Esmeralda</h2>
            </div>
            <p className="mt-2 text-lg">Monitore os vagões da Linha 9 com inteligência artificial.</p>
          </div>
        </div>

        <hr className="my-10" />

        <div className="flex items-center justify-between">
          <p className="text-2xl text-gray-800 font-semibold">Verifique qual vagão apresenta atividade suspeita.</p>
          <button
            onClick={() => router.push('/Alertas')}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg shadow transition-all"
          >
            <AlertTriangle size={24} />
            Visualizar Alertas
          </button>
        </div>
      </main>
    </div>
  );
}
