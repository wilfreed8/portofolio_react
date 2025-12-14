import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { projectsData } from '@/assets/data/projectsData';
import { useScrollReveal } from '@/assets/hooks/useScrollReveal';
import { Button } from '../ui/Button';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Countup } from '../Countup';

export const Projects = () => {
  const isMobile = window.innerWidth <768
  const { ref, isRevealed } = useScrollReveal();
  const [filter, setFilter] = useState('all');
  const skillsref = useRef();

  const [visibleProjectsCount, setVisibleProjectsCount] = useState(6);

  useEffect(() => {
    const updateInitialCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleProjectsCount(3);
      } else {
        setVisibleProjectsCount(6);
      }
    };
    updateInitialCount();
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projectsData;
    return projectsData.filter(project => project.techs.includes(filter));
  }, [filter]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleProjectsCount);
  }, [filteredProjects, visibleProjectsCount]);

  const techs = useMemo(() => {
    return Array.from(new Set(projectsData.flatMap(p => p.techs)));
  }, []);

  const handleLoadMore = () => {
    setVisibleProjectsCount(filteredProjects.length);
  };

  useGSAP(() => {
    const skills = gsap.utils.toArray(skillsref.current.children);
    skills.forEach((skill) => {
      gsap.from(skill, {
        yPercent: 500,
        duration: 0.5,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 50%",
          end: "top 0%",
          scrub:isMobile ? false : true
        }
      });
    });
  });

  return (
    <section
      id="projects"
      className="py-20 bg-slate-50 dark:bg-[#0B1120]"
    >
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`text-center md:mb-12 mb-8 transition-all duration-1000
          ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold md:mb-4 mb-1.5 text-slate-900 dark:text-white">
            Mes Projets
          </h2>
          <p className="md:text-lg text-md text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Découvrez quelques-unes de mes réalisations récentes
          </p>
        </div>

        {/* FILTERS */}
        <div
          ref={skillsref}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 transform rounded-full shadow-md transition-all
              ${filter === 'all'
                ? 'bg-indigo-600 text-white shadow-indigo-500/40'
                : 'bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 hover:shadow-lg'}
            `}
          >
            Tous
          </button>

          {techs.map(tech => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 transform rounded-full shadow-md transition-all
                ${filter === tech
                  ? 'bg-indigo-600 text-white shadow-indigo-500/40'
                  : 'bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 hover:shadow-lg hover:shadow-indigo-500/30'}
              `}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* LOAD MORE */}
        {visibleProjectsCount < filteredProjects.length && (
          <div className="flex flex-col items-center justify-center mt-12 gap-8">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="bg-indigo-600 text-white border-indigo-600
                hover:bg-indigo-700 hover:border-indigo-700
                transition-all shadow-lg shadow-indigo-500/40 animate-bounce hover:animate-none"
            >
              Voir Plus de Projets ...
            </Button>
          </div>
        )}

        {/* COUNT */}
         
        {/* Compteur de Projets */}
        <div className=" flex justify-center items-center mt-16 mx-auto relative dark:hover:shadow-cyan-500/50 hover:shadow-xl rounded-lg shadow-xl py-5 md:py-10 w-fit px-16 md:px-35 dark:bg-gray-800 bg-white border-none dark:border dark:border-gray-700"> {/* Fond et bordure Dark Mode */}
            <span className='absolute text-shadow-md px-2 -top-3 dark:text-cyan-400 font-semibold dark:bg-gray-900 bg-white rounded-lg'>Projects Count</span> {/* Adaptation des couleurs */}
              <Countup value={projectsData.length} delay={1} className="text-6xl font-medium tracking-tighter whitespace-pre-wrap dark:text-white" prefixe="+" suffixe={undefined}/>
        </div>
      </div>
    </section>
  );
};
