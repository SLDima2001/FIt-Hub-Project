import Post from "../post/Post";
import "./Profileposts.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Posts = ({ userName }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/allPosts/{id}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div className="posts">
    {posts.map(post => (
      <ProfilePost post={post} userName={userName} key={post.id} />
    ))}
  </div>;
};

export default Posts;
