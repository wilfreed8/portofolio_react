import React, { useContext, useState } from "react";
import { SiTheregister } from "react-icons/si";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

type formdata = {
  email: string;
  password: string;
  select: boolean;
};

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const [formData, setFormData] = useState<formdata>({
    email: "",
    password: "",
    select: false,
  });

  const [errors, setErrors] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(false);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "select") {
      setFormData((prev) => ({ ...prev, select: !prev.select }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogin(true);

    try {
      const res = await toast.promise(
        fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(formData),
        }),
        {
          loading: "Connexion en cours...",
          error: "Erreur serveur lors de la connexion",
        }
      );

      const data = await res.json();

      if (!res.ok || data.errors) {
        setErrors(data.errors || data);
        toast.error("erreur de validation du formulaire");
      } else {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Bienvenue 👋");
        navigate("/");
      }
    } finally {
      setIsLogin(false);
    }
  };

  return (
    <div className="flex items-center justify-center mx-[10%] mb-20 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col justify-center items-center w-full gap-5">
        <div className="flex flex-col justify-center items-center w-full">
          <SiTheregister className="h-20 w-20 text-info dark:text-cyan-400" />
          <h1 className="text-2xl font-bold">Sign in your account</h1>
        </div>

        <form onSubmit={handleLogin} className="w-full">
          <div className="border border-base-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-900 rounded-xl py-10 w-full space-y-1 flex flex-col md:px-15 px-8">
            {errors?.message && (
              <p className="text-error text-sm">{errors.message}</p>
            )}

            <label className="font-semibold pt-3">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleForm}
              className="input bg-white dark:bg-gray-800 dark:text-white outline-none rounded-sm shadow-md border-base-300 dark:border-gray-700"
            />
            {errors?.email && (
              <p className="text-error text-sm">{errors.email}</p>
            )}

            <label className="font-semibold pt-4">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleForm}
              className="input bg-white dark:bg-gray-800 dark:text-white outline-none rounded-sm shadow-md border-base-300 dark:border-gray-700"
            />
            {errors?.password && (
              <p className="text-error text-sm">{errors.password}</p>
            )}

            <div className="flex justify-between mt-3">
              <span className="font-semibold flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.select}
                  name="select"
                  onChange={handleForm}
                />
                Remember me
              </span>
              <span className="font-semibold px-8 text-info dark:text-cyan-400 cursor-pointer">
                Forgot password?
              </span>
            </div>
         <div className="flex mt-1 justify-center relative items-center hover:translate-y-1 transition-all gap-2">
             <Loader className={isLogin ? "flex text-white z-10 animate-spin absolute left-1/3" : "hidden"}/>
            <input
              type="submit"
              disabled={isLogin}
              value="Login"
              className="w-full bg-info dark:bg-cyan-600 p-2 rounded-sm text-xl font-bold text-white cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed dark:disabled:bg-gray-500 dark:disabled:cursor-not-allowed   shadow-lg"
            />
             </div>
          </div>
        </form>
      </div>
      <div className="w-full h-full hidden md:flex mt-15">
        <img src="robot.png" className="h-full" />
      </div>
    </div>
  );
};

export default Login;
