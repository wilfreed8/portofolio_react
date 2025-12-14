import { IconCode, IconDeviceDesktopCode, IconMail, IconSchool, IconUserCheck } from "@tabler/icons-react";
import { GrHome } from "react-icons/gr";
import { MobileFloatingDock } from "./ui/mobile_floating-dock";

export function MobileFloatingDockDemo() {
  const links = [
    {
    title: "Home",
    icon: <GrHome className="" />,
    href: "#home",
  },
  {
    title: "Projets",
    icon: <IconDeviceDesktopCode className="" />, // tu voulais Twitter ici, mais si c'est Instagram : remplace par FaInstagram
    href: "#projects",
  },
  {
    title: "Skills",
    icon: <IconCode className="" />,
    href: "#skills",
  },
  {
    title: "About",
    icon: <IconUserCheck className="" />,
    href: "#about",
  },
  {
    title: "Experience",
    icon: <IconSchool className="" />,
    href: "#experience",
  },
  {
    title: "Contact",
    icon: <IconMail className="" />,
    href: "#contact",
  },
];
  return (
    <div className="flex items-center justify-center  w-full ">
      <MobileFloatingDock
        className="" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
