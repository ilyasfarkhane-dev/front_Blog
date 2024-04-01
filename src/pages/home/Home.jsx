import PostList from "../../components/posts/PostList";
import PostItem from "../../components/posts/PostItem";
import Hero from "@/components/Hero";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "@/redux/apiCalls/postApiCall";
import Ceo from "@/components/ceo";
const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    // Fetch all posts instead of just the first page
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <section className="home bg-gray-100 min-h-screen">
      <div className="home-hero-header">
        <Hero />
      </div>
      <Ceo />
      <div className="bg-white pt-0">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="font-serif	 text-3xl text-center font-bold text-blue-700  mb-20">
            Discover Blogs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {/* Mapping through each post item */}
            {posts.map((item) => (
              // Rendering a PostItem component for each post
              <PostItem post={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
