'use client';

import Sidebar from '../Components/Sidebar';
import { useState, useEffect } from 'react';

interface Alerta {
  linha: string;
  vagao: number;
  atividade: string;
}

export default function AlertasPage() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [historico, setHistorico] = useState<Alerta[]>([]);
  const [linha, setLinha] = useState('');
  const [vagao, setVagao] = useState('');
  const [atividade, setAtividade] = useState('');

  const [filtroLinha, setFiltroLinha] = useState('');
  const [filtroVagao, setFiltroVagao] = useState('');
  const [filtroAtividade, setFiltroAtividade] = useState('');

  useEffect(() => {
    const fetchAlertas = async () => {
      const alertasSalvos = localStorage.getItem('alertas');
      const historicoSalvo = localStorage.getItem('historico');

      if (alertasSalvos) {
        setAlertas(JSON.parse(alertasSalvos));
      } else {
        try {
          const response = await fetch('/api/alertas');
          const data = await response.json();
          setAlertas(data);
          localStorage.setItem('alertas', JSON.stringify(data));
        } catch (error) {
          console.error('Erro ao buscar alertas da API:', error);
        }
      }

      if (historicoSalvo) {
        setHistorico(JSON.parse(historicoSalvo));
      }
    };

    fetchAlertas();
  }, []);

  useEffect(() => {
    localStorage.setItem('historico', JSON.stringify(historico));
  }, [historico]);

  const adicionarAlerta = () => {
    const novoAlerta: Alerta = {
      linha,
      vagao: parseInt(vagao),
      atividade,
    };

    const novosAlertas = [...alertas, novoAlerta];
    setAlertas(novosAlertas);
    localStorage.setItem('alertas', JSON.stringify(novosAlertas));

    setLinha('');
    setVagao('');
    setAtividade('');
  };

  const omitirAlerta = (index: number) => {
    const omitido = alertas[index];
    const novosAlertas = [...alertas];
    novosAlertas.splice(index, 1);

    setAlertas(novosAlertas);
    localStorage.setItem('alertas', JSON.stringify(novosAlertas));

    const novoHistorico = [...historico, omitido];
    setHistorico(novoHistorico);
    localStorage.setItem('historico', JSON.stringify(novoHistorico));
  };

  const excluirDoHistorico = (index: number) => {
    const novoHistorico = [...historico];
    novoHistorico.splice(index, 1);
    setHistorico(novoHistorico);
    localStorage.setItem('historico', JSON.stringify(novoHistorico));
  };

  const historicoFiltrado = historico.filter((alerta) => {
    const linhaMatch = alerta.linha.toLowerCase().includes(filtroLinha.toLowerCase());
    const atividadeMatch = alerta.atividade.toLowerCase().includes(filtroAtividade.toLowerCase());
    const vagaoMatch = filtroVagao === '' || alerta.vagao.toString() === filtroVagao;
    return linhaMatch && atividadeMatch && vagaoMatch;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-10 bg-white text-gray-900">
        <h1 className="text-5xl font-extrabold">Alertas</h1>

        {/* Adicionar alerta */}
        <div className="mt-10 mb-6 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Novo Alerta</h2>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Linha"
              value={linha}
              onChange={(e) => setLinha(e.target.value)}
              className="p-2 border border-gray-300 rounded w-40"
            />
            <input
              type="number"
              placeholder="Vagão"
              value={vagao}
              onChange={(e) => setVagao(e.target.value)}
              className="p-2 border border-gray-300 rounded w-32"
            />
            <input
              type="text"
              placeholder="Atividade suspeita"
              value={atividade}
              onChange={(e) => setAtividade(e.target.value)}
              className="p-2 border border-gray-300 rounded w-80"
            />
            <button
              onClick={adicionarAlerta}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Tabela de Alertas Ativos */}
        <h2 className="text-2xl font-bold mt-10 mb-4">Alertas Ativos</h2>
        {alertas.length === 0 ? (
          <p className="text-gray-500">Nenhum alerta ativo.</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-black p-2">Linha</th>
                  <th className="border border-black p-2">Vagão</th>
                  <th className="border border-black p-2">Atividade</th>
                  <th className="border border-black p-2">Ação</th>
                </tr>
              </thead>
              <tbody>
                {alertas.map((alerta, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="border p-2 text-center">{alerta.linha}</td>
                    <td className="border p-2 text-center">{alerta.vagao}</td>
                    <td className="border p-2 text-center">{alerta.atividade}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => omitirAlerta(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Omitir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Histórico de Alertas Omitidos */}
        <h2 className="text-2xl font-bold mt-12 mb-2">Histórico de Alertas Omitidos</h2>

        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Filtrar por linha"
            value={filtroLinha}
            onChange={(e) => setFiltroLinha(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Filtrar por atividade"
            value={filtroAtividade}
            onChange={(e) => setFiltroAtividade(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Filtrar por vagão"
            value={filtroVagao}
            onChange={(e) => setFiltroVagao(e.target.value)}
            className="p-2 border border-gray-300 rounded w-40"
          />
        </div>

        {historicoFiltrado.length === 0 ? (
          <p className="text-gray-500">Nenhum alerta omitido encontrado.</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-black p-2">Linha</th>
                  <th className="border border-black p-2">Vagão</th>
                  <th className="border border-black p-2">Atividade</th>
                  <th className="border border-black p-2">Ação</th>
                </tr>
              </thead>
              <tbody>
                {historicoFiltrado.map((alerta, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="border p-2 text-center">{alerta.linha}</td>
                    <td className="border p-2 text-center">{alerta.vagao}</td>
                    <td className="border p-2 text-center">{alerta.atividade}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => excluirDoHistorico(index)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
