import { skillsData } from '@/assets/data/skillsData';
import { useScrollReveal } from '@/assets/hooks/useScrollReveal';
import React, { useState } from 'react';

export const Skills = () => {
  const { ref, isRevealed } = useScrollReveal();
  const [activeTab, setActiveTab] = useState('frontend');

  const filteredSkills = skillsData.filter(skill => skill.category === activeTab);
  const categories = Array.from(new Set(skillsData.map(skill => skill.category)));

  return (
    <section
      id="skills"
      className="py-10 min-h-screen bg-slate-50 dark:bg-[#0B1120]"
    >
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`text-center md:mb-12 mb-6 transition-all duration-1000
          ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold md:mb-4 mb-2 text-slate-900 dark:text-white">
            Compétences Techniques
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Technologies et langages que je maîtrise
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-3 md:mb-10 mb-5">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-3xl md:rounded-2xl transition-all shadow-md
                ${activeTab === category
                  ? 'dark:bg-indigo-600 bg-orange-500 shadow-orange-500/40 text-white dark:shadow-indigo-500/40'
                  : 'bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 hover:-translate-y-1 hover:shadow-lg'}
              `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-white dark:bg-[#111827]
                rounded-xl p-6 shadow-lg
                hover:shadow-indigo-500/30
                transition-all duration-700 card-hover"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4
                  bg-indigo-600 text-white shadow-md shadow-indigo-500/40"
                >
                  {skill.icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    {skill.name}
                  </h3>

                  <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full
                      bg-gradient-to-r from-indigo-500 via-cyan-500 to-fuchsia-500
                      transition-all duration-1000"
                      style={{ width: isRevealed ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>

                <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
