import { useMatch } from "react-router-dom";

const PostCardSkelton = () => {
  const matchPosts = useMatch("/posts/myPost");

  return (
    <div
      className="
        flex flex-col items-center justify-center
        md:w-90 w-80 h-60 m-1
        p-5 space-y-3
        rounded-lg
        border border-base-200 dark:border-gray-700
        bg-base-200 dark:bg-gray-800
        shadow-md
      "
    >
      {/* TITLE SKELETON */}
      <div className="skeleton w-24 h-5 rounded-md" />

      {/* BODY SKELETON */}
      <div className="skeleton w-full h-full rounded-md" />

      {/* ACTIONS SKELETON (MY POSTS) */}
      {matchPosts && (
        <div className="flex gap-3 mt-2">
          <div className="skeleton w-20 h-10 rounded-md" />
          <div className="skeleton w-20 h-10 rounded-md" />
        </div>
      )}
    </div>
  );
};

export default PostCardSkelton;
