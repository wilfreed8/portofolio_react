import React, { useContext, useEffect, useState, useRef } from 'react';
import AI_Prompt from '../../components/kokonutui/ai-prompt';
import { AppContext } from '../../Context/AppContext';
import toast, { Toaster } from 'react-hot-toast';

interface Chat {
  id: number;
  request: string;
  response: string;
}

const Chatbot = () => {
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const { token } = useContext(AppContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChats = async () => {
      const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
      const fetchPromise = fetch("/api/chats", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw data.errors || new Error("Erreur serveur");
        return data as Chat[];
      });

      toast.promise(fetchPromise, {
        loading: "Chargement des messages...",
        success: "Messages chargés",
        error: "Erreur lors du chargement",
      })
        .then((data) => {
          setChats(data);
          setLoading(false);
        })
        .catch(() => setChats([]));
      clearTimeout(timeoutId);
    }; 

    fetchChats();
  }, [token, request]);

  // Scroll automatique vers le bas
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div className="relative w-full pt-20 min-h-screen">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-4xl font-semibold">Chatbot</h1>
        <Toaster />
      </div>

      <div
        ref={scrollRef}
        className="mx-10 h-[65dvh] overflow-y-auto px-4 py-6 space-y-6 bg-white rounded-md shadow"
      >
        {loading ? (
          <p className="text-center text-gray-500">Chargement des messages...</p>
        ) : (
          chats.map((chat) => (
            <div key={chat.id} className="space-y-2">
              {/* Message utilisateur */}
              <div className="flex justify-end">
                <div className="max-w-[75%] px-4 py-3 font-semibold rounded-sm bg-info text-white shadow-md">
                  {chat.request}
                </div>
              </div>

              {/* Réponse IA */}
              <div className="flex justify-start">
                <div className="md:max-w-[75%] max-h-65 px-4 py-5 rounded-md bg-base-200 text-base-content shadow overflow-auto">
                  {chat.response}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed w-full bottom-0">
        <div className="flex justify-center items-center p-2 bg-base-100 shadow-inner">
          <AI_Prompt setRequest={setRequest} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
