export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne intelligemment les classes CSS en utilisant clsx et tailwind-merge.
 * @param inputs - Les classes à fusionner.
 * @returns Une chaîne de caractères de classes fusionnées.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}