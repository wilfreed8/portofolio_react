/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ProjetFloatingDock } from "@/components/ui/projet_flaotingDock";
import {  IconDeviceDesktopCode } from "@tabler/icons-react";
import { MailCheckIcon } from "lucide-react";
import { GrGamepad } from "react-icons/gr";

export function ProjetFloatingDockDemo() {
   const links = [
      {
      title: "Games",
      icon: <GrGamepad className="" />,
      href: "/projets/games",
    },
    {
      title: "todo list",
      icon: <IconDeviceDesktopCode className="" />, // tu voulais Twitter ici, mais si c'est Instagram : remplace par FaInstagram
      href: "/projets",
    }, {
      title: "MyEmails",
      icon: <MailCheckIcon className="" />, // tu voulais Twitter ici, mais si c'est Instagram : remplace par FaInstagram
      href: "/projets/myemails",
    },
  ];
  return (
    <div className="flex items-center justify-center  w-full ">
      <ProjetFloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
