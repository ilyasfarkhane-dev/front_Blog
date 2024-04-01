import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import {
  deletePost,
  fetchSinglePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";
// import {
//   BriefcaseIcon,
//   CalendarIcon,
//   CheckIcon,
//   ChevronDownIcon,
//   CurrencyDollarIcon,
//   LinkIcon,
//   MapPinIcon,
//   PencilIcon,
// } from "@heroicons/react/20/solid";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="max-w-4xl mx-auto p-4 pt-[130px]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={file ? URL.createObjectURL(file) : post?.image.url}
            alt=""
            className="w-full h-64 object-cover"
          />
          {user?._id === post?.user?._id && (
            <form
              onSubmit={updateImageSubmitHandler}
              className="absolute top-2 right-2"
            >
              <label
                htmlFor="file"
                className="text-blue-500 hover:underline cursor-pointer"
              >
                <i className="bi bi-image-fill me-2"></i>
                Select new image
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type="submit"
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md"
              >
                save
              </button>
            </form>
          )}
        </div>
        <div className="p-4">
          <h1 className="font-serif	text-2xl font-bold mb-2">{post?.title}</h1>
          <div className="flex items-center mb-4">
            <img
              src={post?.user.profilePhoto?.url}
              alt=""
              className="w-8 h-8 object-cover rounded-full mr-2"
            />
            <div>
              <strong className="text-blue-500 ">{post?.user.username}</strong>
              <span className="text-gray-600 ml-2">
                {new Date(post?.createdAt).toDateString()}
              </span>
            </div>
          </div>
          <p className="font-serif	ml-8 text-gray-700 mb-4">
            {post?.description}
          </p>
          {user?._id === post?.user?._id && (
            <div className="flex">
              <button
                onClick={() => setUpdatePost(true)}
                className="mr-2 inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                Edit
              </button>
              <button
                onClick={deletePostHandler}
                className="px-3 py-1 inline-flex items-center bg-red-500 text-white rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;
