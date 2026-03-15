import { AiOutlineProduct } from 'react-icons/ai';
import { FaCartArrowDown } from 'react-icons/fa';
import { SidebarNavItem } from './types';

export const SidebarNav: SidebarNavItem[] = [
  {
    id: 1,
    title: 'Catalog',
    path: '/',
    icon: AiOutlineProduct,
  },
  {
    id: 2,
    title: 'Cart',
    path: '/cart',
    icon: FaCartArrowDown,
  },
];
