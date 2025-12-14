"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { GrAdd } from "react-icons/gr";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const drawerVariants = {
  hidden: { y: "100%", opacity: 0, rotateX: 5 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
};

export default function DrawerCreatePost() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [isCreated, setIsCreated] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const CreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreated(true);
  const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
    try {
      const res = await toast.promise(
        fetch("/api/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }),
        {
          loading: "Création du post...",
          error: "Serveur : erreur côté serveur",
        }
      );
      clearTimeout(timeoutId);
      const data = await res.json();

      if (!res.ok || data.errors) {
        setErrors(data.errors);
        toast.error("erreur de validation du formulaire")
      } else {
        toast.success("Post créé avec succès ✅")
        setErrors({});
        setFormData({ title: "", body: "" });
          navigate("/posts/myposts");
      }
    } finally {
      setIsCreated(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-primary text-white shadow-md shadow-blue-500/40 hover:translate-y-1 hover:shadow-lg hover:shadow-blue-500/60 transition-all hover:text-white">
          <GrAdd className="text-white" /> Create Post
        </Button>
      </DrawerTrigger>

      {/* FIX MOBILE : no translate, no overflow-hidden */}
      <div className="w-full flex items-center">
        <DrawerContent
          className="
            p-6
            rounded-t-2xl
            shadow-xl
            md:mx-[25%]
            min-h-[72dvh]
            touch-pan-y
            mb-2
            md:px-[4%]
            md:min-h-[95vh]
            bg-base-100 dark:bg-gray-900
            text-gray-800 dark:text-gray-200
          "
        >
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            <motion.div variants={itemVariants}>
              <DrawerHeader className="px-0 pb-4">
                <DrawerTitle className="text-xl font-semibold">
                  Create a new post
                </DrawerTitle>
                <p className="text-sm opacity-70">
                  Fill the inputs to create a new post
                </p>
              </DrawerHeader>
            </motion.div>

            <motion.form
              variants={itemVariants}
              className="mx-auto w-full -mt-5"
              onSubmit={CreatePost}
            >
              <div className="flex flex-col bg-base-200 dark:bg-gray-800 border border-base-300 dark:border-gray-700 p-5 rounded-md space-y-3">
                <label htmlFor="title" className="font-bold">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="input w-full outline-none font-semibold text-md shadow-sm border-base-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  value={formData.title}
                  onChange={handleForm}
                />
                {errors?.title && (
                  <p className="text-error font-mono text-sm">
                    {errors.title[0]}
                  </p>
                )}

                <label htmlFor="body" className="font-bold">
                  Body
                </label>
                <textarea
                  name="body"
                  className="textarea w-full outline-none h-30 font-semibold text-md shadow-sm border-base-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  value={formData.body}
                  onChange={handleForm}
                />
                {errors?.body && (
                  <p className="text-error font-mono text-sm">
                    {errors.body[0]}
                  </p>
                )}
                  <div className="flex justify-center relative items-center hover:translate-y-1 transition-all gap-1">
             <Loader className={isCreated ? "mt-2 flex text-white z-10 animate-spin absolute left-1/3" : "hidden"}/>
                <input 
                  type="submit"
                  value="Create post"
                  disabled={isCreated}
                  className="w-full mt-2 py-2 rounded-md font-bold text-white shadow-md shadow-indigo-600 bg-primary transition-all  disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
                />
             </div>
              </div>
            </motion.form>

            <DrawerClose asChild>
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/60">
                Close
              </Button>
            </DrawerClose>
          </motion.div>
        </DrawerContent>
      </div>
    </Drawer>
  );
}
