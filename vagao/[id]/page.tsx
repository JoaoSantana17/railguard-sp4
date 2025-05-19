'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import { Video, ArrowLeft, RefreshCw, Power } from 'lucide-react';

export default function VagaoPage() {
  const router = useRouter();
  const params = useParams();
  const vagaoId = params?.id ?? '??';

  const [cameraStatus, setCameraStatus] = useState<'Ligada' | 'Desligada' | 'Reiniciando'>('Desligada');

  const handleReiniciar = () => {
    setCameraStatus('Reiniciando');
    setTimeout(() => setCameraStatus('Ligada'), 3000);
  };

  const handleLigar = () => setCameraStatus('Ligada');
  const handleDesligar = () => setCameraStatus('Desligada');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

     <main className="flex-1 p-16 max-w-5xl mx-auto">

        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-teal-600 hover:underline"
        >
          <ArrowLeft size={24} /> Voltar
        </button>

        <h1 className="text-6xl font-extrabold mb-8 text-gray-900">
          Monitoramento do Vagão {vagaoId}
        </h1>

        <div className="flex items-center gap-4 mb-12">
          <Video size={48} className={`transition-colors ${cameraStatus === 'Ligada' ? 'text-green-600' : cameraStatus === 'Desligada' ? 'text-red-600' : 'text-yellow-600'}`} />
          <p className="text-3xl font-semibold text-gray-900">
            Status da Câmera: <span className="capitalize">{cameraStatus}</span>
          </p>
        </div>

        <div className="mb-14 rounded-lg border border-gray-300 bg-black h-[500px] flex items-center justify-center text-white text-2xl select-none">
          {cameraStatus === 'Ligada' ? (
            <video
              autoPlay
              muted
              loop
              className="h-full w-full object-cover rounded-lg"
              src="/videos/sample-camera-feed.mp4"
            />
          ) : cameraStatus === 'Reiniciando' ? (
            <p>Reiniciando câmera...</p>
          ) : (
            <p>Câmera desligada</p>
          )}
        </div>

        <div className="flex gap-8">
          <button
            disabled={cameraStatus === 'Ligada'}
            onClick={handleLigar}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg transition text-xl"
          >
            <Power size={28} />
            Ligar
          </button>

          <button
            disabled={cameraStatus === 'Desligada' || cameraStatus === 'Reiniciando'}
            onClick={handleDesligar}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg transition text-xl"
          >
            <Power size={28} className="rotate-180" />
            Desligar
          </button>

          <button
            disabled={cameraStatus === 'Desligada' || cameraStatus === 'Reiniciando'}
            onClick={handleReiniciar}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg transition text-xl"
          >
            <RefreshCw size={28} />
            Reiniciar
          </button>
        </div>
      </main>
    </div>
  );
}
