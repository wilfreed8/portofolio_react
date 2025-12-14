import { GoalIcon, Loader } from "lucide-react";
import React, { useContext, useState } from "react";
import { SiTheregister } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

type formdata = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  select: boolean;
};

const Register = () => {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<formdata>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    select: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [isRegister, setIsRegister] = useState(false);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "select") {
      setFormData((prev) => ({ ...prev, select: !prev.select }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegister(true);

    try {
      const res = await toast.promise(
        fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(formData),
        }),
        {
          loading: "Création du compte...",
          error: "Erreur serveur lors de l’inscription",
        }
      );

      const data = await res.json();

      if (!res.ok || data.errors) {
        setErrors(data.errors || {});
        toast.error("erreur de validation du formulaire");
      } else {
        toast.success("Compte créé avec succès 🎉")
        navigate("/login");
      }
    } finally {
      setIsRegister(false);
    }
  };

  return (
    <div className="flex items-center justify-center mx-[10%] mb-20 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col justify-center items-center w-full gap-5">
        <div className="flex flex-col justify-center items-center w-full">
          <SiTheregister className="w-20 h-20 text-info dark:text-cyan-400" />
          <h1 className="text-2xl font-bold">Create an account</h1>
        </div>

        <form onSubmit={handleRegister} className="w-full">
          <div className="border border-base-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-md py-10 w-full space-y-2 flex flex-col md:px-15 px-8">
            <label className="font-semibold pt-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleForm}
              className="input bg-white dark:bg-gray-800 dark:text-white shadow-md outline-none rounded-sm"
            />
            {errors.name && <p className="text-error">{errors.name[0]}</p>}

            <label className="font-semibold pt-2">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleForm}
              className="input bg-white dark:bg-gray-800 dark:text-white shadow-md outline-none rounded-sm"
            />
            {errors.email && <p className="text-error">{errors.email[0]}</p>}

            <label className="font-semibold pt-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleForm}
              className="input bg-white dark:bg-gray-800 dark:text-white shadow-md outline-none rounded-sm"
            />
            {errors.password && <p className="text-error">{errors.password[0]}</p>}

            <label className="font-semibold pt-2">Password Confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleForm}
              className="input bg-white dark:bg-gray-800 dark:text-white shadow-md outline-none rounded-sm"
            />

            <div className="flex justify-between gap-2">
              <span className="font-semibold pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.select}
                  name="select"
                  onChange={handleForm}
                />
                Remember me
              </span>
              <span className="font-semibold px-5 pt-2 text-info dark:text-cyan-400 cursor-pointer">
                Forgot password?
              </span>
            </div>
             <div className="flex justify-center relative items-center hover:translate-y-1 transition-all gap-2">
             <Loader className={isRegister ? "flex text-white z-10 animate-spin absolute left-1/3" : "hidden"}/>
            <input
              type="submit"
              disabled={isRegister}
              value="Register"
              className="w-full bg-info dark:bg-cyan-600 p-2 rounded-sm text-xl font-bold text-white cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed dark:disabled:bg-gray-500 dark:disabled:cursor-not-allowed   shadow-lg"
            />
             </div>
          </div>
        </form>
      </div>

      <div className="w-full hidden md:flex mt-25">
        <img src="garcon.png" className="h-150 w-140" />
      </div>
    </div>
  );
};

export default Register;
