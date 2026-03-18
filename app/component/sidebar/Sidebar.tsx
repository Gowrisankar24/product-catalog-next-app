'use client';
import Link from 'next/link';
import { SidebarNav } from '../../lib/Contsants';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className='fixed z-40 w-16 top-12 flex flex-col items-center gap-6 px-2 py-6 h-screen bg-linear-to-br from-[#2563EB] to-[#1D4ED8] dark:bg-linear-to-br dark:from-neutral-900 dark:to-neutral-800'>
      {SidebarNav?.map((d) => {
        const isActive = pathname === d.path;
        return (
          <Tooltip key={d.id}>
            <TooltipTrigger>
              <div>
                <Link
                  href={d.path}
                  className={`block p-1 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-slate-300/30 ring-2 ring-white/50'
                      : 'bg-transparent'
                  }`}
                >
                  <d.icon className='text-white' size={25} />
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <span>{d.title}</span>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
};
