import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "@/redux/apiCalls/postApiCall";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./create-post.css";

const CreatePostModal = ({ setCreatePost }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Form Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return alert("Post Title is required");
    if (description.trim() === "") return alert("Post Description is required");
    if (!file) return alert("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await dispatch(createPost(formData));
      setCreatePost(false);
      navigate(`/profile/${user._id}`); // Navigate to the profile page after the post is created
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="update-post flex justify-center">
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="flex justify-end">
            <abbr
              title="close"
              className=" top-0 h-4 text-red-600 cursor-pointer"
            >
              <i
                onClick={() => setCreatePost(false)}
                className="bi bi-x-circle-fill create-post-form-close text-3xl"
              ></i>
            </abbr>
          </div>
          <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="flex flex-col items-center mx-auto max-w-xs px-8">
              <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
              <input
                type="text"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="5"
                placeholder="Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                type="file"
                name="file"
                id="file"
                className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostModal;
