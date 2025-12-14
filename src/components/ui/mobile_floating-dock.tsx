import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const MobileFloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [active, setActive] = useState<string | null>(null);

  // 🔥 ScrollSpy basé sur scroll
  useEffect(() => {
    const handleScroll = () => {
      let currentActive: string | null = null;
      let minDistance = Infinity;

      items.forEach((item) => {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        // si le haut de la section est au-dessus du tiers du viewport
          const distance = Math.abs(rect.top - 80);// distance entre le top de la section et le top viewport

    if (distance < minDistance) {
      minDistance = distance;
      currentActive = item.title;
    }

      });

      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = async (title: string, controls: any) => {
    setActive(title);
    await controls.start({
      scale: 1.25,
      transition: { type: "spring", stiffness: 260, damping: 12 },
    });
    await controls.start({
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 15 },
    });
  };

  return (
    <div
      className={cn(
        "fixed z-10 bottom-4 left-1/2 -translate-x-1/2 w-[92%] px-3 py-3 flex justify-between items-end rounded-2xl  shadow-lg backdrop-blur-sm bg-white/50 dark:bg-neutral-900/70 md:hidden",
        className
      )}
    >
      {items.map((item) => {
        const controls = useAnimation();

        return (
          <motion.a
            href={item.href}
            key={item.title}
            onClick={() => handleClick(item.title, controls)}
            className="flex flex-col items-center justify-center w-16"
          >
            <motion.div
              animate={controls}
              className={cn(
                "flex items-center px-5 justify-center w-12 h-12 rounded-full bg-info text-white dark:bg-neutral-800",
                active === item.title && "bg-orange-500 dark:bg-cyan-500"
              )}
            >
              <div className="w-6 h-6">{item.icon}</div>
            </motion.div>

            <span
              className={cn(
                "mt-1 text-[11px] font-medium transition-colors",
                active === item.title
                  ? "opacity-100 text-orange-500 dark:text-cyan-500"
                  : "opacity-80 text-neutral-700 dark:text-white"
              )}
            >
              {item.title}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
};
