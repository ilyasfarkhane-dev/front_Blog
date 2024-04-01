import { Link } from "react-router-dom";

const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  return (
    <div className="bg-white shadow-lg rounded-[5px] overflow-hidden">
      <div className="relative group ">
        <img
          src={post?.image.url}
          alt=""
          className="w-full h-60 object-cover rounded-[3px] transition duration-300 transform group-hover:scale-105"
        />
        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
          <div className="text-white text-center">
            <h2 className=" font-serif text-[20px] font-semibold">
              {post.title}
            </h2>
            <Link
              to={`/posts/details/${post?._id}`}
              className="mt-2 inline-block px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
            >
              Read More...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
