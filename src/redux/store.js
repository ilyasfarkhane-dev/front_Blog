import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";

import { passwordReducer } from "./slices/passwordSlice";
import { postReducer } from "./slices/postSlice";
import { profileReducer } from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    password: passwordReducer,
  },
});

export default store;
