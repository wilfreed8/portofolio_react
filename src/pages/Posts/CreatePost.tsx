/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

type post = {
  title: string;
  body: string;
};

const CreatePost = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [formData, setFormData] = useState<post>({
    title: "",
    body: "",
  });

  const [isCreated, setIsCreated] = useState(false);
  const [errors, setErrors] = useState<unknown>({});

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          error: "Erreur serveur lors de la création",
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
        setFormData({
          title: "",
          body: "",
        });
          navigate("/posts/myPosts");
      }
    } finally {
      setIsCreated(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:-mt-10 md:mx-80 text-gray-800 dark:text-gray-200">
      <h1 className="font-mono font-bold text-2xl my-5">
        Create a new post
      </h1>

      <form className="md:w-full mx-auto shadow-md" onSubmit={CreatePost}>
        <div className="mx-auto flex flex-col space-y-2 py-6 pb-10 px-15 rounded-md border border-base-200 dark:border-gray-700 bg-base-200 dark:bg-gray-900">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleForm}
            className="input w-full outline-none font-semibold text-md shadow-sm border-base-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white"
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
            id="body"
            value={formData.body}
            onChange={handleForm}
            className="input w-full outline-none h-30 font-semibold text-md shadow-sm border-base-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white"
          />
          {errors?.body && (
            <p className="text-error font-mono text-sm">
              {errors.body[0]}
            </p>
          )}
          <div className="flex mt-1 justify-center relative items-center hover:translate-y-1 transition-all gap-2">
             <Loader className={isCreated ? "flex text-white z-10 animate-spin absolute left-1/3" : "hidden"}/>
          <input
            type="submit"
            value="Create post"
            disabled={isCreated}
            className="w-full mt-2 py-2 rounded-md font-bold text-white shadow-lg transition-all 
                       bg-primary dark:bg-indigo-600 
                       hover:translate-y-1 
                       disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
          />
             </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
