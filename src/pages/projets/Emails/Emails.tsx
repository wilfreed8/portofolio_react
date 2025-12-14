/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { AppContext } from '@/Context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import EmailTemplate from './EmailTemplate';

interface Email {
  id: number;
  name: string;
  email: string;
  message: string;
}

const Emails = () => {
  const { token } = useContext(AppContext);
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
      const res = await toast.promise(
        fetch('/api/my_emails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
        {
          loading: 'Chargement des emails...',
          success: 'Emails chargés avec  succès',
          error: 'Erreur lors du chargement des emails',
        }
      );
      clearTimeout(timeoutId);
         const data = await res.json();
        if (!res.ok) throw data.errors || new Error('Erreur serveur');
        else {
          setEmails(data.my_emails);  
        }
        
    };
    fetchEmails();
  }, [token]);

  return (
    <div className="py-10 flex flex-col items-center justify-center gap-5 -mt-10">
      <h1 className="text-4xl font-bold dark:text-cyan-500 text-center mb-5">Mes Emails</h1>

      {emails.length === 0 ? (
        <p className="text-gray-500">Aucun email trouvé</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:mx-[4%] mx-2">
          {emails.map((email) => (
            <EmailTemplate
              key={email.id}
              email={email}
              className="border bg-white max-h-40 h-32 md:h-40 rounded-lg shadow-md"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Emails;
