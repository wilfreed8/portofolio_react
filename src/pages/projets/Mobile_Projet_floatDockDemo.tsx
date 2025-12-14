import { IconCode, IconDeviceDesktopCode, IconInfoCircle, IconMail, IconMailAi, IconSchool, IconUserCheck } from "@tabler/icons-react";
import { GrGamepad, GrHome } from "react-icons/gr";
import { MobileProjetFloatingDock } from "@/components/ui/mobile_projet_flaotingDock";
import { MailCheckIcon } from "lucide-react";

export function MobileProjetFloatingDockDemo() {
  const links = [
    {
    title: "Games",
    icon: <GrGamepad  />,
    href: "/projets/games",
  },
  {
    title: "todo list",
    icon: <IconDeviceDesktopCode  />, // tu voulais Twitter ici, mais si c'est Instagram : remplace par FaInstagram
    href: "/projets",
  },
  {
    title: "MyEmails",
    icon: <MailCheckIcon  />, // tu voulais Twitter ici, mais si c'est Instagram : remplace par FaInstagram
    href: "/projets/myemails",
  },
];
  return (
    <div className="flex items-center justify-center  w-full ">
      <MobileProjetFloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
