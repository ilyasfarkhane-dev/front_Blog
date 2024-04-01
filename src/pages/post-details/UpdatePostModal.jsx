import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");

    if (description.trim() === "")
      return toast.error("Post Description is required");

    dispatch(updatePost({ title, description }, post?._id));
    setUpdatePost(false);
  };

  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="flex justify-end">
            <abbr
              title="close"
              className="absolute top-1 right-10 text-red-600"
            >
              <i
                onClick={() => setUpdatePost(false)}
                className="bi bi-x-circle-fill update-profile-form-close"
              ></i>
            </abbr>
          </div>
          <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <h1 className="update-profile-title">Update Post</h1>
              <input
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <textarea
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
              <button
                type="submit"
                className="update-profile-btn mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostModal;
