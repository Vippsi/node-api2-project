import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from './Post'

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [change, setChange] = useState()

  const getData = () => {
    axios.get("http://localhost:4000/api/posts").then((res) => {
      setPosts(res.data.data);
    });
  };
  

  useEffect(() => {
    getData();
  }, [change]);

 return (
     <div className='postListDiv'>
         {posts.map(post => (
             <Post post = {post} setChange={setChange}/>
         ))}
     </div>
 )
};

export default PostList;
