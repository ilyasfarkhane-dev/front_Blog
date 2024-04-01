import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/redux/apiCalls/profileApiCall";
import { logoutUser } from "@/redux/apiCalls/authApiCall";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const id = user._id;
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/login";
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false); // Fermer la liste lorsque l'élément est cliqué
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <img
          onClick={() => setIsOpen(!isOpen)}
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white cursor-pointer"
          src={profile?.profilePhoto?.url}
          alt=""
        />
      </div>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-50"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-50"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/profile/${id}`}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={handleItemClick} // Fermer la liste lorsque l'élément est cliqué
                >
                  My Profile
                </Link>
              )}
            </Menu.Item>

            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
