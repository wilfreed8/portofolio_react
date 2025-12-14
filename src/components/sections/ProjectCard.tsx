import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/assets/hooks/useScrollReveal';
import type { Project } from '@/assets/types';
import { FaBackward } from 'react-icons/fa';


interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { ref, isRevealed } = useScrollReveal();
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Utilisation d'une couleur d'accentuation basée sur l'indice pour un effet visuel (optionnel)
  const accentColorClass = index % 2 === 0 ? 'text-indigo-500 hover:text-cyan-400' : 'text-indigo-500 hover:text-indigo-400';
  const shadowColorClass = index % 2 === 0 ? 'dark:shadow-cyan-500/40' : 'dark:shadow-cyan-500/40';

  return (
    <div
      ref={ref}
      className={`relative md:h-135 h-100 w-85 md:w-full mx-auto transition-all duration-700 delay-${index * 100} ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      // La perspective est appliquée ici, sur le conteneur principal
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        // Le style de préservation 3D est sur l'élément qui tourne
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Face avant de la carte */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden dark:shadow-md shadow-lg hover:-translate-y-2 transition-all transform ease-in ${shadowColorClass} dark:bg-gray-900 dark:text-gray-100`}
          // Le dos de la carte est caché
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="md:h-48 h-28 bg-gradient-to-br from-blue-500 via-blue-400 to-info flex items-center justify-center">
            <span className="text-white text-5xl">🚀</span>
          </div>
          <div className="md:p-6 p-4">
            <h3 className="md:text-xl text-lg leading-5.5 font-semibold mb-2">{project.title}</h3>
            <p className="dark:text-gray-400 text-gray-600 text-sm md:text-[17px] mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techs.map(tech => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-slate-50 shadow-sm dark:bg-cyan-900/50 dark:text-cyan-200 rounded-full text-xs font-medium dark:border dark:border-cyan-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsFlipped(true)}
                className={`font-medium transition-colors ${accentColorClass}`}
              >
                Voir détails ...
              </button>
              <div className="flex space-x-3">
                <a href={project.repoUrl} className={`text-gray-400 ${accentColorClass}`}>
                  <Github size={18} />
                </a>
                <a href={project.liveUrl} className={`text-gray-400 ${accentColorClass}`}>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Face arrière de la carte */}
        <div 
          className={`absolute inset-0 w-full h-full p-6 dark:bg-gray-800 dark:text-gray-100 rounded-2xl shadow-lg ${shadowColorClass}`}
          // Elle est déjà tournée de 180deg et son dos est caché
          style={{ 
            transform: 'rotateY(180deg)', 
            backfaceVisibility: 'hidden' 
          }}
        >
          <h3 className="text-xl font-semibold mb-4 dark:text-cyan-400">Détails du projet</h3>
          <div className="space-y-4">
            <div>
              {/* Badge Problème : Rouge sombre pour l'attention */}
              <h4 className="font-medium md:mb-1 inline-block px-2 py-0.5 dark:bg-red-900/50 bg-red-500 text-red-800 dark:text-red-300 rounded text-xs dark:border dark:border-red-700">Problème</h4>
              <p className="md:text-[17px] text-sm dark:text-gray-300 text-gray-600 mt-1">{project.problem}</p>
            </div>
            <div>
              {/* Badge Solution : Vert sombre pour la réussite */}
              <h4 className="font-medium md:mb-1 inline-block px-2 py-0.5 dark:bg-green-900/50 bg-green-500 text-green-900 dark:text-green-300 rounded text-xs dark:border dark:border-green-700">Solution</h4>
              <p className="md:text-[17px] text-sm dark:text-gray-300 text-gray-600 mt-1">{project.solution}</p>
            </div>
            <div>
              {/* Badge Résultats : Bleu/Cyan sombre pour l'information */}
              <h4 className="font-medium md:mb-1 inline-block px-2 py-0.5 dark:bg-cyan-900/50 bg-info text-blue-900 dark:text-cyan-300 rounded text-xs dark:border dark:border-cyan-700">Résultats</h4>
              <p className="md:text-[17px] text-sm dark:text-gray-300 text-gray-600 mt-1">{project.results}</p>
            </div>
          </div>
          <button
            onClick={() => setIsFlipped(false)}
            className={`mt-2 ${accentColorClass} font-medium flex gap-2 items-center transition-colors`}
          >
            <FaBackward size={14}/>
            <span>Retour</span>
          </button>
        </div>
      </div>
    </div>
  );
};