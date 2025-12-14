import React, { useRef } from 'react';
import { Github, Linkedin, Download, MapPin, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { useScrollReveal } from '@/assets/hooks/useScrollReveal';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const About = () => {
  const { ref, isRevealed } = useScrollReveal();
  const profilref = useRef();

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;
    gsap.from(profilref.current, {
      xPercent: -120,
      scrollTrigger: {
        trigger: "#about",
        start: isMobile ? "top 90%" : "top 80%",
        end: isMobile ? "top 28%" : "bottom 120%",
        scrub: true,
      }
    });
  });

  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <div className="text-center md:mb-12 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold md:mb-4 mb-2 text-slate-900 dark:text-white">
            À Propos
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            En savoir plus sur mon parcours et mes motivations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={profilref}>
            <img src="fille.png" alt="cartoon picture" />
          </div>

          <div
            ref={ref}
            className={`transition-all duration-1000 delay-300 p-8 rounded-xl
              bg-white dark:bg-[#111827]
              shadow-lg dark:shadow-black/40
              ${isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
              Développeur passionné et créatif
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Passionné par la création d'applications web modernes et performantes, je transforme les idées en expériences numériques exceptionnelles. Avec une expertise en développement full-stack et un debut en Data Science, je m'efforce de créer des solutions élégantes et efficaces qui répondent aux besoins des utilisateurs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-slate-700 dark:text-slate-300">
              <div className="flex items-center">
                <MapPin className="text-indigo-500 mr-3" size={18} />
                <span>Rabat, Maroc</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="text-emerald-500 mr-3" size={18} />
                <span>Disponible</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="text-sky-500 mr-3" size={18} />
                <span>Ingénierie Data & Software Science</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-violet-500 mr-3" size={18} />
                <a
                  href="mailto:wilfreednouame@gmail.com"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  wilfreednouame@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="https://github.com"
                className="px-4 py-2 flex items-center gap-2 rounded-lg
                bg-indigo-600 hover:bg-indigo-700
                dark:bg-indigo-500 dark:hover:bg-indigo-400
                text-white transition-all hover:-translate-y-1"
              >
                <Github size={18} /> GitHub
              </a>

              <a
                href="https://linkedin.com"
                className="px-4 py-2 flex items-center gap-2 rounded-lg
                bg-sky-600 hover:bg-sky-700
                dark:bg-sky-500 dark:hover:bg-sky-400
                text-white transition-all hover:-translate-y-1"
              >
                <Linkedin size={18} /> LinkedIn
              </a>

              <a
                href="#"
                className="px-4 py-2 flex items-center gap-2 rounded-lg
                bg-emerald-600 hover:bg-emerald-700
                dark:bg-emerald-500 dark:hover:bg-emerald-400
                text-white transition-all hover:-translate-y-1"
              >
                <Download size={18} /> Télécharger CV
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">
                Soft Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Communication",
                  "Travail d'équipe",
                  "Résolution de problèmes",
                  "Autonomie",
                  "Créativité"
                ].map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm
                    bg-slate-200 text-slate-800
                    dark:bg-slate-800 dark:text-cyan-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
