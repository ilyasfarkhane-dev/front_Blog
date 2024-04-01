import PostItem from "./PostItem";
// import "./posts.css";

const PostList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* Mapping through each post item */}
      {posts.map((item) => (
        // Rendering a PostItem component for each post
        <PostItem post={item} key={item._id} />
      ))}
    </div>
  );
};

export default PostList;
