import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/redux/apiCalls/profileApiCall";

export default function Avatar() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const id = user._id;
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  return (
    <>
      <div className="flex">
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={profile?.profilePhoto?.url}
          alt=""
        />
      </div>
    </>
  );
}
