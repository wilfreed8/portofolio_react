import { useContext, useEffect, useState } from "react";
import { Construction } from "lucide-react";
import TodoItem from "../../components/TodoItem";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AppContext } from "@/Context/AppContext";
import toast from "react-hot-toast";

type Priority = "urgente" | "moyenne" | "basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

type FormData = {
  text: string;
  priority: Priority;
};

const Todo = () => {
  const { token } = useContext(AppContext);

  const savedTodo = localStorage.getItem("todos");
  const initialsTodos: Todo[] = savedTodo ? JSON.parse(savedTodo) : [];
 
  const [todos, setTodos] = useState<Todo[]>(initialsTodos);
  const [formData, setFormData] = useState<FormData>({
    text: "",
    priority: "moyenne",
  });
  const [filter, setFilter] = useState<Priority | "tous">("tous");
  const [errors, setErrors] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo>({
    id: 0,
    text: "",
    priority: "moyenne",
  });
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());
  //recuperer les todos
  useEffect(() => {
    const getTodos = async () => {
      const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
      try { const res = await toast.promise(fetch("/api/mytodos", {
          headers: { Authorization: `Bearer ${token}` },
        }),{
          loading:"Récupération des todos ...",
          error:"Serveur : erreur cote serverveur"  
        } );
        clearTimeout(timeoutId);
        const data = await res.json();
        if (res.ok && !data.errors) {
          setTodos(data);
        } else {
          setErrors(data.errors);
        } } catch (err) {
        toast.error("Erreur de récupération côté serveur");
      } 
    };
    getTodos();
  }, [token]);

  // --- Ajouter Todo
  const addTodo = async () => {
    if (!formData.text.trim()) return toast.error("Veuillez remplir le champ texte");

    setIsEdit(true);
    const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
    try {
      const res = await toast.promise(
        fetch("/api/todos", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        }),
        { loading: "Ajout en cours...", error: "Serveur :  errreur coté serveur" }
      );
       clearTimeout(timeoutId);
      const data = await res.json();
      if (!res.ok || data.errors) {
        toast.error("Erreur de validation du formulaire");
      } else {
        setTodos((prev) => [...prev, { id: data.id, ...formData }]);
        setFormData({ text: "", priority: "moyenne" });
        toast.success("Todo ajoutée ✅");
      }
    } finally {
      setIsEdit(false);
    }
  };

  // --- Modifier Todo
  const oneditTodo = async () => {
    const updatedTodo = { id: editedTodo.id, ...formData };
    setIsEdit(true);
    const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
    try {
      const res = await toast.promise(
        fetch(`/api/todos/${editedTodo.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(updatedTodo),
        }),
        { loading: "Mise à jour en cours...", error: "Serveur : Erreur coté serveur" }
      );
      clearTimeout(timeoutId);
      const data = await res.json();
      if (!res.ok || data.errors) {
        toast.error("Erreur de validation du formulaire");
      } else {
        setTodos((prev) =>
          prev.map((t) => (t.id === editedTodo.id ? { ...t, ...formData } : t))
        );
        setIsEdit(false);
        setEditedTodo({ id: 0, text: "", priority: "moyenne" });
        setFormData({ text: "", priority: "moyenne" });
        toast.success("Todo mise à jour ✅");
      }
    } finally {
      setIsEdit(false);
    }
  };

  // --- Supprimer Todo
  const deleteTodo = async (id: number) => {
    setIsEdit(true);
    const timeoutId =  setTimeout(() => {
        toast("il semble que vous votre  connexion internet  est lente",{
          icon:"⚠️",
          duration:2000
        });
      },5000);
    try {
      const res = await toast.promise(
        fetch(`/api/todos/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }),
        { loading: "Suppression en cours...", error: "Serveur : erreur cote serveur" }
      );
      clearTimeout(timeoutId);
      const data = await res.json();
      if (!res.ok || data.errors) {
        toast.error("Erreur lors de la suppression");
      } else {
        setTodos((prev) => prev.filter((t) => t.id !== id));
        setSelectedTodos((prev) => {
          const copy = new Set(prev);
          copy.delete(id);
          return copy;
        });
        toast.success("Todo supprimée ❌");
      }
    } finally {
      setIsEdit(false);
    }
  };

  // --- Toggle sélection
  const ToggleSelectedTodo = (id: number) => {
    const newSet = new Set(selectedTodos);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedTodos(newSet);
  };

  // --- Finir sélection
  const finishSelected = () => {
    for (const id of selectedTodos) deleteTodo(id);
    setSelectedTodos(new Set());
  };

  // --- Filtrage
  const filteredTodos =
    filter === "tous" ? todos : todos.filter((todo) => todo.priority === filter);

  const totalCount = todos.length;
  const urgentCount = todos.filter((t) => t.priority === "urgente").length;
  const mediumCount = todos.filter((t) => t.priority === "moyenne").length;
  const lowCount = todos.filter((t) => t.priority === "basse").length;



  // --- Sauvegarde localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // --- Animation GSAP
  useGSAP(() => {
    gsap.from(".todo", { opacity: 0, xPercent: 10, delay: 0.5 });
  });

  return (
    <div className="flex justify-center w-full mb-10">
      <div className="todo mx-2 w-full md:w-2/3 flex-col gap-4 my-6 md:my-15 bg-base-200 dark:bg-gray-800 p-5 rounded-2xl shadow-md">
        {errors && <p className="p-4 text-error italic">{errors}</p>}

        {/* INPUTS */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={formData.text}
            className="input w-full shadow-md outline-none dark:bg-gray-700 dark:text-white"
            placeholder="Ajouter une tâche"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, text: e.target.value }))
            }
          />

          <select
            className="select w-full shadow-md outline-none dark:bg-gray-700 dark:text-white"
            value={formData.priority}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, priority: e.target.value as Priority }))
            }
          >
            <option value="urgente">Urgente</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>

          <button
            className="btn border-none shadow-sm btn-primary shadow-md"
            onClick={isEdit ? oneditTodo : addTodo}
          >
            {isEdit ? "Edit" : "Ajouter"}
          </button>
        </div>

        {/* FILTERS */}
        <div className="space-y-2 flex-1 h-fit mt-3">
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              <button
                className={`btn border-none shadow-sm btn-soft ${filter === "tous" ? "btn-primary" : ""}`}
                onClick={() => setFilter("tous")}
              >
                Tous ({totalCount})
              </button>
              <button
                className={`btn border-none shadow-sm btn-soft ${filter === "urgente" ? "btn-primary" : ""}`}
                onClick={() => setFilter("urgente")}
              >
                Urgent ({urgentCount})
              </button>
              <button
                className={`btn border-none shadow-sm btn-soft ${filter === "moyenne" ? "btn-primary" : ""}`}
                onClick={() => setFilter("moyenne")}
              >
                Moyenne ({mediumCount})
              </button>
              <button
                className={`btn border-none shadow-sm btn-soft ${filter === "basse" ? "btn-primary" : ""}`}
                onClick={() => setFilter("basse")}
              >
                Basse ({lowCount})
              </button>
            </div>

            <button
              className="btn shadow-sm border-none btn-error w-full md:w-auto"
              disabled={selectedTodos.size === 0}
              onClick={finishSelected}
            >
              Finir la sélection ({selectedTodos.size})
            </button>
          </div>

          {/* LISTE TODOS */}
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={() => deleteTodo(todo.id)}
                  isSelected={selectedTodos.has(todo.id)}
                  onToggleSelect={() => ToggleSelectedTodo(todo.id)}
                  onEdit={() => {
                    setFormData({ text: todo.text, priority: todo.priority });
                    setIsEdit(true);
                    setEditedTodo(todo);
                  }}
                  isEditing={todo.id === editedTodo.id}
                />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col gap-5">
              <Construction className="h-40 w-40 text-primary" strokeWidth={1} />
              <p className="text-sm font-semibold">Aucune tâche pour ce filtre</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
