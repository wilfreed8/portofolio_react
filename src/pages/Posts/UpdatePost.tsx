import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const UpdatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------- GET POST ---------- */
  useEffect(() => {
    const getPost = async () => {
      const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
      const res = await toast.promise(
        fetch(`/api/posts/${id}`),
        {
          loading: "Chargement du post...",
          success: "Post chargé",
          error: "Serveur : erreur coté serveur",
        }
      );
      clearTimeout(timeoutId);

      const data = await res.json();

      if (res.ok && data.post) {
        setFormData({
          title: data.post.title,
          body: data.post.body,
        });
      }
    };

    getPost();
  }, [id]);

  /* ---------- UPDATE POST ---------- */
  const UpdatePost = async (e: any) => {
    e.preventDefault();
    setIsUpdated(true);

    const res = await toast.promise(
      fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }),
      {
        loading: "Mise à jour du post...",
        error: "Serveur : erreur coté serveur",
      }
    );

    const data = await res.json();

    if (!res.ok || data.errors) {
      setErrors(data.errors);
      toast.error("erreur de validation du formulaire")
      setIsUpdated(false);
    } else {
      toast.success("Post mis à jour avec succès")
      setErrors({});
      setIsUpdated(false);
      navigate("/posts/myPosts");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <h1 className="font-mono font-bold text-2xl mb-6 text-center">
        Update my Post
      </h1>

      <form
        onSubmit={UpdatePost}
        className="w-full flex justify-center items-center"
      >
        <div
          className="
            w-full md:w-1/2
            flex flex-col space-y-3
            p-6 rounded-lg
            border border-base-200 dark:border-gray-700
            bg-base-200 dark:bg-gray-800
            shadow-md
          "
        >
          {/* TITLE */}
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleForm}
            className="input w-full dark:text-gray-900 outline-none font-semibold shadow-sm border-base-300"
          />
          {errors?.title && (
            <p className="text-error font-mono">{errors.title[0]}</p>
          )}

          {/* BODY */}
          <label htmlFor="body" className="font-bold">
            Body
          </label>
          <textarea
            name="body"
            id="body"
            value={formData.body}
            onChange={handleForm}
            className="textarea w-full dark:text-gray-900 outline-none h-32 font-semibold shadow-sm border-base-300"
          />
          {errors?.body && (
            <p className="text-error font-mono">{errors.body[0]}</p>
          )}

          {/* SUBMIT */}
            <div className="flex justify-center relative items-center hover:translate-y-1 transition-all ">
             <Loader className={isUpdated ? "flex mt-3 text-white z-10 animate-spin absolute left-1/3" : "hidden"}/> 
          <input
            type="submit"
            value="Update post"
            disabled={isUpdated}
            className="
              w-full mt-3 py-2
              rounded-md
              bg-primary text-white font-bold
              shadow-md shadow-blue-700/50
              disabled:bg-gray-500
              disabled:cursor-not-allowed
              disabled:shadow-none
            "
          />
             </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
