/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { motion, useAnimation } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const MobileProjetFloatingDock = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    className?: string;
}) => {
    const [active, setActive] = useState<string | null>(null);

    const handleClick = async (title: string, controls: unknown) => {
        setActive(title);
        
        // animation on click
        await controls.start({
            scale: 1.25,
            transition: { type: "spring", stiffness: 260, damping: 12 },
        });
        
        await controls.start({
            scale: 1,
            transition: { type: "spring", stiffness: 260, damping: 15 },
        });
    };
    
    const MotionLink = motion(Link);
  return (
    <div
      className={cn(
        "fixed z-10 bottom-4 left-1/2 -translate-x-1/2 md:w-auto w-[92%] px-3 md:px-9 py-2 flex justify-center gap-2 items-end rounded-2xl   shadow-lg backdrop-blur-sm bg-white/50 dark:bg-neutral-900/70 md:hidden",
        className
      )}
    >
      {items.map((item) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const controls = useAnimation();

        return (
          <MotionLink
            to={item.href}
            key={item.title}
            onClick={() => handleClick(item.title, controls)}
            className="flex flex-col items-center justify-center w-16"
          >
            {/* ICON */}
            <motion.div
              animate={controls}
              className={cn(
                "flex items-center px-5 justify-center w-12 h-12 rounded-full bg-info  dark:bg-neutral-800",
                active === item.title ? "ring-1 bg-orange-500 ring-orange-500 shadow-lg text-white dark:bg-cyan-500 dark:ring-cyan-500" : "text-white hover:text-white"
              )}
            >
              <div className={cn(
                "w-6 h-6",
                active === item.title && "text-white"
              )}>{item.icon}</div>
            </motion.div>

            {/* LABEL always visible */}
            <span
              className={cn(
                "mt-1 text-[11px] font-medium text-neutral-700 dark:text-white transition-opacity",
                active === item.title ? "opacity-100 text-orange-500 dark:text-cyan-500" : "opacity-90"
              )}
            >
              {item.title}
            </span>
          </MotionLink>
        );
      })}
    </div>
  );
};
