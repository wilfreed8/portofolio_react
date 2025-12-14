/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { AppContext } from "@/Context/AppContext";
import { LogOut, Menu, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import toast, { Toaster } from 'react-hot-toast';
import { Footer } from "./Footer";
import { IconDeviceDesktopCode } from "@tabler/icons-react";
import { ModeToggle } from "./Mode-toggle";
import { ThemeProviderContext } from "@/Context/ThemeContext";
import { GrHome } from "react-icons/gr";

const links = [
	{ name: "Home", href: "/", icon: <GrHome size={20}/> },
	{ name: "Posts", href: "/posts", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-workflow"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10h10"/><path d="M7 14h10"/></svg> },
	{ name: "Projets", href: "/projets", icon: <IconDeviceDesktopCode size={20}/> },
];

const Navbar = () => {
  const {theme} =  useContext(ThemeProviderContext)
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const { user, token, setToken, setUser } = useContext(AppContext);

	useEffect(() => {
		const setupScrollLinks = () => {
			document.querySelectorAll('a[href^="#"]').forEach(anchor => {
				anchor.addEventListener('click', function(e) {
					e.preventDefault();
					const targetID = this.getAttribute('href');
					const targetElement = document.querySelector(targetID);
					if (targetElement) {
						const navbarHeight = document.querySelector('.nav')?.offsetHeight || 0;
						const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
						gsap.to(window, {
							duration: 1.5,
							scrollTo: { y: targetPosition, autoKill: false },
							ease: "power2.out"
						});
					}
				});
			});
		};
		setupScrollLinks();
		return () => {};
	}, []);

	const handleLogout = async () => {
		const res = await toast.promise(
			fetch("/api/logout", { headers: { Authorization: `Bearer ${token}` }, method: "POST" }),
			{ loading: 'Déconnexion en cours...', success: 'Vous êtes déconnecté !', error: 'Erreur lors de la déconnexion.' }
		);
		const data = await res.json();
		if (res.ok && !data.error) {
			toast("Espérons vous revoir bientôt !", { icon: "👋" });
			setToken(null);
			setUser(null);
			localStorage.removeItem("token");
			navigate("/");
		} else if (data.error) {
			toast.error(data.error);
		}
	};

  
	return (
		<>
			<div className={`min-h-screen ${theme=="dark" ? "relative":""}  font-inter m-0 flex-col bg-white dark:bg-gray-900 flex justify-center items-center`}>
				{theme=="light" || theme=="system" ? (<div
					className="absolute inset-0 z-0 m-0 w-full "
					style={{ background: "radial-gradient(125% 125% at 50% 90%, rgba(255,255,255,0.7) 35%, #3ABFF8 100%)" }}
				/>):(
       <div
    className="absolute inset-0 z-0 "
    style={{
      background: "#020617",
      backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
      `,
      backgroundSize: "32px 32px, 32px 32px, 100% 100%",
    }}
  />
        )}
				<nav className="nav fixed top-0 w-full overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md  dark:border-gray-700 z-50 transition-colors duration-300">
					<div className="container mx-auto px-4 py-3 flex justify-between items-center">
						{/* LEFT LOGO */}
						<div className="flex md:gap-3 gap-1.5 items-center md:-ml-6">
							<img src="Profile picture (1).png" className="w-12 h-12 rounded-full shadow-lg" alt="Profile"/>
							<h1 className="font-semibold text-xl text-blue-500 dark:text-white transition-colors duration-300">
								<span className="italic text-3xl">W</span>ilfreed.dev
							</h1>
						</div>

						{/* LINKS DESKTOP */}
						<ul className="hidden md:flex gap-10 text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">
							{links.map(link => {
								const isActive = location.pathname === link.href;
								return (
									<li key={link.href} className={`relative before:absolute flex justify-center items-center transition-all before:w-[0%] hover:before:w-full before:ease-in-out before:h-0.5 before:transform before:transition-all before:bg-blue-500 dark:before:bg-cyan-500 before:-bottom-0.5`}>
										<Link to={link.href} className={`${isActive ? "text-blue-600 dark:text-cyan-400" : "hover:text-blue-500 dark:hover:text-cyan-400"} flex gap-2 items-center`}>
											<span className={`${isActive ? "text-blue-600 dark:text-cyan-400" : "text-gray-800 dark:text-gray-400"} group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors duration-300`}>
												{link.icon && link.icon}
											</span>
											{link.name}
										</Link>
									</li>
								);
							})}
						</ul>
             <div className="md:flex md:gap-5 md:flex-row-reverse">
						<div className="hidden md:flex items-center gap-3">
							{user ? (
								<div className="flex items-center gap-3">
									<p className="text-lg flex gap-2 items-center text-gray-800 dark:text-gray-300">
										Bienvenue <span className="font-bold text-orange-500 dark:text-cyan-400">{user.name}</span>
									</p>
									<button className="px-4 py-2 rounded-lg transition-all hover:bg-red-600 bg-red-500 border border-red-500/20 shadow-md shadow-red-500/40 text-white dark:hover:bg-red-700" onClick={handleLogout}>
										Déconnexion<LogOut size={20} className="inline ml-1"/>
									</button>
								</div>
							) : (
								<div className="flex gap-2">
									<Link className="px-4 py-2 rounded-lg shadow-md transition-all border border-gray-300 bg-success text-white hover:translate-y-1 dark:bg-gray-800 dark:text-cyan-500 dark:border-gray-700 dark:hover:bg-gray-700" to="/register">
										Register
									</Link>
									<Link className="px-4 py-2 rounded-lg shadow-md transition-all bg-blue-500 text-white hover:translate-y-1 " to="/Login">
										Login
									</Link>
								</div>
							)}
						</div>

						{/* BURGER BUTTON */}
            <div className="flex flex-row-reverse   items-center justify-center gap-3">
						<button className="md:hidden   p-2 transform transition-all text-gray-800 dark:text-gray-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
							{isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
						</button>
             <span><ModeToggle/></span>
            </div>
             </div>
						{/* RIGHT : USER / AUTH */}
					</div>

					{/* MOBILE MENU */}
					{isMenuOpen && (
						<div className="md:hidden bg-white/80 backdrop-blur-md transform duration-300 transition-all  dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-700 p-4">
							{/* LINKS MOBILE */}
							<ul className="flex flex-col text-lg font-semibold text-gray-800 dark:text-gray-200">
								{links.map(link => {
									const isActive = location.pathname === link.href;
									return (
										<Link key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)} className={`flex gap-2 p-3 rounded-lg transition-all items-center ${isActive ? "bg-info dark:bg-cyan-500 text-white" : "hover:bg-info hover:text-white dark:hover:bg-cyan-700"}`}>
											{link.icon && link.icon}{link.name}
										</Link>
									);
								})}
							</ul>

							{/* AUTH MOBILE */}
							<div className="mt-6 border-t pt-4 border-gray-300 dark:border-gray-700">
								{user ? (
									<div className="flex flex-col gap-3">
										<p className="text-lg flex gap-2 items-center justify-center text-gray-800 dark:text-gray-300 mb-2">
											Bienvenue <span className="font-bold  dark:text-cyan-400 text-orange-500">{user.name}</span>
										</p>
										<button className="px-4 py-2 rounded-lg transition-all bg-red-500 hover:bg-red-600 w-full text-white" onClick={handleLogout}>
											Déconnexion
										</button>
									</div>
								) : (
									<div className="flex flex-col gap-3">
										<Link to="/register" className="px-4 py-2 rounded-lg transition-all text-center border border-gray-300 bg-success text-white  hover:translate-y-1 dark:bg-gray-800 dark:text-cyan-500 dark:border-gray-700 dark:hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>
											Register
										</Link>
										<Link to="/Login" className="px-4 py-2 rounded-lg transition-all text-center bg-blue-500 text-white hover:bg-blue-500/20" onClick={() => setIsMenuOpen(false)}>
											Login
										</Link>
									</div>
								)}
							</div>
						</div>
					)}
				</nav>

				<main className="w-full relative z-1 py-30 font-inter max-w-full">
					<Toaster containerStyle={{ top: "80px" }}/>
					<Outlet/>
				</main>

				<div className="w-full relative"><Footer/></div>
			</div>
		</>
	);
};

export default Navbar;
