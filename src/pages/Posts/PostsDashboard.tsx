/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Home, PlusCircle, User2 } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const links = [
  {
    label: "All posts",
    href: "/posts",
    icon: <Home size={18} />,
  },
  {
    label: "My posts",
    href: "/posts/myPosts",
    icon: <User2 size={18} />,
  },
  {
    label: "Create post",
    href: "/posts/create_Post",
    icon: <PlusCircle size={18} />,
  },
];

const PostsDashboard = () => {
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* TOP NAV */}
      <div className="fixed top-20 z-10 w-full flex justify-center">
        <ul className="flex flex-wrap md:flex-nowrap gap-2 p-4 bg-white/80 dark:bg-gray-900/80 border backdrop-blur-md rounded-xl shadow-md">
          {links.map((link) => (
            <li key={link.href}>
              <Link to={link.href}>
                <button
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    border transition-all
                    ${
                      isActive(link.href)
                        ? "dark:bg-cyan-600 bg-orange-500 border-orange-500 dark:border-neutral-600 text-white shadow-lg dark:shadow-cyan-500/40 shadow-orange-500/40"
                        : "bg-base-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-base-200 dark:hover:bg-gray-700 hover:-translate-y-1"
                    }
                  `}
                >
                  {link.icon}
                  <span className="font-semibold">{link.label}</span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTENT */}
      <main className="w-full pt-28 pb-6 h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PostsDashboard;
