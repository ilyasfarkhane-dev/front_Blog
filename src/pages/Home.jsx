import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/", { withCredentials: true })
      .then((response) => {
        setUsers(response.data);
        console.log("Users:", response.data); // Log the fetched user data
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <section className="pt-[100px] justify-center items-center">
      <div className="text-center">
        <h1>Welcome to the Home Page</h1>
        <p>This is the content of the Home Page.</p>
        <h2>Users:</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
