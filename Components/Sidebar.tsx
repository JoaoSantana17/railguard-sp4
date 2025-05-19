'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Monitor,
  Bell,
  User
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/Dashboard', icon: <LayoutDashboard size={24} /> },
  { label: 'Monitoramento', href: '/Monitoramento', icon: <Monitor size={24} /> },
  { label: 'Alertas', href: '/Alertas', icon: <Bell size={24} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-1/4 min-w-[250px] bg-teal-800 text-white flex flex-col justify-between p-6 shadow-lg">
      <nav className="mt-10">
        <h2 className="text-2xl font-bold mb-10 text-center">RailGuard</h2>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-lg font-semibold ${
                  pathname === item.href
                    ? 'bg-white text-teal-800 shadow'
                    : 'hover:bg-teal-700'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 border-t border-teal-600 pt-6 flex items-center gap-3 px-4">
        <User size={24} />
        <div>
          <p className="text-lg font-semibold">Olá, usuário</p>
          <p className="text-sm text-teal-200">Operador</p>
        </div>
      </div>
    </aside>
  );
}
