import React from "react";

const PostGrid = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="relative pt-[50%]">
            <img
              src={post.image_url || "https://via.placeholder.com/300x200?text=Image+Gaada"}
              alt={post.title}
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <time className="text-gray-500 text-sm mb-2 block">
              {new Date(post.published_at).toLocaleDateString()}
            </time>
            <h3 className="font-semibold line-clamp-3">{post.title}</h3>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostGrid;
