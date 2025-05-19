'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === '1234') {
      setError('');
      router.push('/Dashboard');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-700 p-4">
      <div className="text-white text-3xl font-bold absolute top-5 left-5 sm:top-10 sm:left-10">
        <span className="text-white">Rail</span>
        <span className="text-gray-200">Guard</span>
      </div>
      <div className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-center text-white text-2xl font-bold mb-4">Login</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Para fins de demonstração: <br />
          <span className="font-semibold">Usuário:</span> admin{' '}
          <span className="font-semibold">Senha:</span> 1234
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2" htmlFor="username">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 rounded bg-white text-gray-900"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded bg-white text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gray-300 text-gray-900 p-2 rounded font-bold hover:bg-gray-400"
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}
