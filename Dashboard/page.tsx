'use client';

import Sidebar from '../Components/Sidebar';
import { Cpu, Eye, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />

      <main className="flex-1 p-12">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold">Sentinela</h1>
          <p className="mt-4 text-xl text-gray-600">
            Sistema de vigilância inteligente para transporte público
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <ShieldCheck className="text-teal-600" size={32} />
              <h2 className="text-2xl font-bold">O que é o Sentinela?</h2>
            </div>
            <p className="text-lg text-gray-700">
              O Sentinela é um sistema de monitoramento e análise comportamental
              que utiliza reconhecimento de padrões para identificar comportamentos suspeitos, como a movimentação de vendedores ambulantes nos trens. Ele oferece vigilância constante e reduz a necessidade de grandes equipes de fiscalização.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <Cpu className="text-teal-600" size={32} />
              <h2 className="text-2xl font-bold">Tecnologia utilizada</h2>
            </div>
            <p className="text-lg text-gray-700">
              Câmeras de alta definição, sensores de movimento e algoritmos de machine learning processam dados em tempo real. O sistema diferencia passageiros comuns de vendedores ambulantes, permitindo respostas rápidas e estratégicas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <Eye className="text-teal-600" size={32} />
              <h2 className="text-2xl font-bold">Eficiência Operacional</h2>
            </div>
            <p className="text-lg text-gray-700">
              A integração com o sistema de controle de trens permite localizar comportamentos irregulares e direcionar a equipe de segurança diretamente ao local do incidente, otimizando a segurança com menor custo.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
