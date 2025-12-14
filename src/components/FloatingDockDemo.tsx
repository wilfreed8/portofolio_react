import { FloatingDock } from "@/components/ui/floating-dock";
import { IconCode, IconDeviceDesktopCode, IconInfoCircle, IconMail, IconMailAi, IconSchool, IconUserCheck } from "@tabler/icons-react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { GrHome, GrProjects } from "react-icons/gr";

export function FloatingDockDemo() {
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
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
