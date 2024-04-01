import Home from "@/pages/home/Home";
import "./App.css";
import Header from "./myui/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Profile from "./pages/profile/Profile";
import PostDetails from "@/pages/post-details/PostDetails";
import CreatePosts from "@/pages/create-post/CreatePost";
import Footer from "@/components/Footer";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="posts">
          <Route
            path="create-post"
            element={user ? <CreatePosts /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<PostDetails />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
