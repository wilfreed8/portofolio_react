/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { experienceData } from '@/assets/data/experienceData';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from 'react';

export const Experience = () => {

  const experienceref = useRef();

  useGSAP(() => {
    const experiences = gsap.utils.toArray(experienceref.current.children);
    experiences.forEach((experience, index) => {
      gsap.from(experience, {
        xPercent: index % 2 === 0 ? -80 : 80,
        yPercent: 100,
        scrollTrigger: {
          trigger: "#experience",
          start: "top 105%",
          end: "bottom 160%",
          scrub: true,
        }
      });
    });
  });

  return (
    <section
      id="experience"
      className="py-20 bg-slate-50 dark:bg-[#0B1120]"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold md:mb-4 mb-2 text-slate-900 dark:text-white">
            Parcours
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Mon parcours académique et professionnel
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">

            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full
              bg-gradient-to-b from-blue-500  to-indigo-500">
            </div>

            <div ref={experienceref}>
              {experienceData.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start mb-12 relative"
                >
                  {index % 2 === 0 ? (
                    <>
                      <div className="w-full md:w-1/2 pb-4 md:pb-0 md:pr-8 md:text-right">
                        <div className="rounded-xl p-6
                          bg-white dark:bg-gray-800
                          shadow-lg dark:shadow-black/40
                          transition-transform hover:-translate-y-1"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-blue-500 dark:text-cyan-500">
                              {item.date}
                            </span>
                            {item.image && (
                              <img
                                src={item.image}
                                alt={`logo ${item.organization}`}
                                className="w-14 h-14 rounded-full bg-white shadow-2xs object-contain"
                              />
                            )}
                          </div>

                          <h3 className="text-xl font-semibold mt-1 text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                          <h4 className="text-slate-600 dark:text-slate-400 mb-3">
                            {item.organization}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 pl-8"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-full md:w-1/2 pr-8"></div>
                      <div className="w-full md:w-1/2 pb-4 md:pb-0 md:pl-8">
                        <div className="rounded-xl p-6
                          bg-white dark:bg-gray-800
                          shadow-lg dark:shadow-black/40
                          transition-transform hover:-translate-y-1"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-blue-500 dark:text-cyan-500">
                              {item.date}
                            </span>
                            {item.image && (
                              <img
                                src={item.image}
                                alt={`logo ${item.organization}`}
                                className="w-14 h-14 rounded-full bg-white shadow-2xs object-contain"
                              />
                            )}
                          </div>

                          <h3 className="text-xl font-semibold mt-1 text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                          <h4 className="text-slate-600 dark:text-slate-400 mb-3">
                            {item.organization}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Timeline icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2
                    w-12 h-12 rounded-full z-10
                    bg-gradient-to-br from-cyan-500 to-indigo-700
                    flex items-center justify-center shadow-lg"
                  >
                    {item.type === 'work' ? (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                        <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762z" />
                        <path d="M9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                      </svg>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
