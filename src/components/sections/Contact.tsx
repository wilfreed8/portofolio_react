/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useContext, useRef, useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Loader } from 'lucide-react';
import { useScrollReveal } from '@/assets/hooks/useScrollReveal';
import { FaWhatsapp } from 'react-icons/fa';
import { AppContext } from '@/Context/AppContext';
import toast from 'react-hot-toast';

export const Contact = () => {
  const { token } = useContext(AppContext);
  const { ref, isRevealed } = useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState(null);

  const formref = useRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const request = fetch("/api/my_emails", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData),
      method: "POST"
    }).then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors);
        throw new Error("Erreur serveur");
      }

      setFormData({ name: "", email: "", message: "" });
      setErrors(null);
      return data;
    });

    toast.promise(request, {
      loading: "Envoi du message...",
      success: "Message envoyé avec succès 🚀",
      error: "Serveur : erreur côté serveur ❌",
    }).finally(() => {
      setIsSending(false);
    });
  };

  return (
    <section
      id="contact"
      className="py-20 mb-10  bg-slate-50 dark:bg-[#0B1120] shadow-lg"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Contact
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour discuter de vos projets
          </p>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-1000 max-w-4xl mx-auto
          ${isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* FORM */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-indigo-500">
                Envoyez-moi un message
              </h3>

              <form ref={formref} onSubmit={handleContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Nom
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="w-full input bg-white dark:bg-[#111827] dark:text-white shadow-md focus:ring-1 focus:ring-indigo-500"
                  />
                  {errors?.name && (<p className="text-error font-mono text-sm">{errors.name[0]}</p>)}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@gmail.com"
                    className="w-full input bg-white dark:bg-[#111827] dark:text-white shadow-md focus:ring-1 focus:ring-indigo-500"
                  />
                  {errors?.email && (<p className="text-error font-mono text-sm">{errors.email[0]}</p>)}  
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Votre message"
                    className="w-full rounded-lg px-3 py-2 bg-white dark:bg-[#111827] dark:text-white shadow-md focus:ring-1 focus:ring-indigo-500"
                  />
                  {errors?.message && (<p className="text-error font-mono text-sm">{errors.message[0]}</p>)}  
                </div>

                <button
                  disabled={isSending}
                  type="submit"
                  className="w-full flex justify-center items-center gap-3 px-6 py-3 rounded-lg font-medium text-white
                  bg-blue-500 hover:bg-blue-700
                  disabled:bg-slate-500 disabled:cursor-not-allowed
                  transition-all hover:-translate-y-1 shadow-md shadow-indigo-500/40"
                >
                  <Loader className={isSending ? "flex animate-spin" : "hidden"}/>Envoyer
                </button>
              </form>
            </div>

            {/* CONTACT INFO */}
            <div
              className={`transition-all duration-1000 delay-300
              ${isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              <h3 className="text-xl font-semibold mb-6 text-indigo-500">
                Informations de contact
              </h3>

              <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <div className="flex items-start">
                  <Mail className="text-indigo-500 mr-4 mt-1" size={18} />
                  <span>wilfreednouame@gmail.com</span>
                </div>

                <div className="flex items-start">
                  <MapPin className="text-indigo-500 mr-4 mt-1" size={18} />
                  <span>Rabat, Maroc</span>
                </div>

                <div className="flex items-start">
                  <Phone className="text-indigo-500 mr-4 mt-1" size={18} />
                  <span>+212 620-445635</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4 text-indigo-400">
                  Réseaux sociaux
                </h4>
                <div className="flex gap-4">
                  {[{icon:Github,href:"https://github.com/wilfreed8"}, {icon:Linkedin,href:""}, {icon:FaWhatsapp}].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-lg flex items-center justify-center
                      bg-slate-200 dark:bg-slate-700 dark:text-cyan-500
                      hover:bg-slate-300 dark:hover:bg-slate-600
                      transition-all hover:-translate-y-1"
                    >
                     <a href={Icon.href && Icon.href} target='_blank'><Icon.icon size={18} /></a> 
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
