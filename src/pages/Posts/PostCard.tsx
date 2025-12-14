import { Edit3Icon, Trash2Icon } from "lucide-react";
import { useMatch } from "react-router-dom";

type Props = {
  title: string;
  body: string;
  deletePost: () => void;
  editPost: () => void;
  isdeleted: boolean;
};

const PostCard = ({
  title,
  body,
  editPost,
  deletePost,
  isdeleted,
}: Props) => {
  const matchPosts = useMatch("/posts/myposts");

  return (
    <div
      className="
        relative
        flex flex-col items-center
        py-4 px-5
        md:w-90 w-80 h-50
        space-y-2
        rounded-lg
        border border-base-200 dark:border-gray-700
        bg-base-200 dark:bg-gray-800
        shadow-md
        transition-all
        hover:-translate-y-1.5
      "
    >
      {/* TITLE */}
      <h1 className="font-bold text-xl text-info dark:text-cyan-400">
        {title}
      </h1>

      {/* BODY */}
      <div
        className="
          w-full h-25
          overflow-auto
          text-justify
          font-semibold
          text-gray-700 dark:text-gray-300
        "
      >
        {body}
      </div>

      {/* ACTIONS (ONLY MY POSTS) */}
      {matchPosts && (
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            onClick={editPost}
            className="
              btn btn-soft
              text-primary
              border
              shadow-sm
              transition-all
              hover:btn-primary
              hover:text-white
              hover:-translate-y-1
            "
          >
            <Edit3Icon />
            edit
          </button>

          <button
            onClick={deletePost}
            disabled={isdeleted}
            className="
              btn btn-soft
              text-error
              border
              shadow-sm
              transition-all
              hover:btn-error
              hover:text-white
              hover:-translate-y-1
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <Trash2Icon />
            delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
