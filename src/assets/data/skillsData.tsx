import type { Skill } from '../types';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDocker, 
  FaPhp,
  FaLaravel
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiSupabase,
  SiVercel,
  SiNextdotjs
} from 'react-icons/si';

export const skillsData: Skill[] = [
  {
    name: 'React',
    level: 85,
    icon: <FaReact size={24} />, // Maintenant, c'est valide !
    category: 'frontend'
  }, {
    name: 'Next.js',
    level: 75,
    icon: <SiNextdotjs size={24} />, // Maintenant, c'est valide !
    category: 'frontend'
  },
  {
    name: 'TypeScript',
    level: 75,
    icon: <SiTypescript size={24} />,
    category: 'frontend'
  },
  {
    name: 'Tailwind CSS',
    level: 90,
    icon: <SiTailwindcss size={24} />,
    category: 'frontend'
  },
  {
    name: 'laravel',
    level: 70,
    icon: <FaLaravel size={24} />,
    category: 'backend'
  },
  {
    name: 'php',
    level: 70,
    icon: <FaPhp size={24} />,
    category: 'backend'
  },
  {
    name: 'Vercel',
    level: 75,
    icon: <SiVercel size={24} />,
    category: 'tools'
  },
  {
    name: 'supabase',
    level: 75,
    icon: <SiSupabase size={24} />,
    category: 'tools'
  }
];