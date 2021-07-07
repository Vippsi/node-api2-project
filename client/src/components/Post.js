import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

export const Post = ({ post, setChange }) => {


    const history = useHistory()
    const deletePost = e => {
        e.preventDefault()
        axios.delete(`https://nodeday4project.herokuapp.com/api/posts/${post.id}`)
        .then(res => {
            console.log(res)
            setChange(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
  return (
    <div className="bigPostDiv">
      <div className="postDiv">
        <div>
          <h3>{post.title}</h3>
          <p>{post.contents}</p>
        </div>
        <div className='timeStampDiv'>
            <p className='dateCreated'>Date Created</p>
          <p className="timeStamp">{post.created_at}</p>
        </div>
        <button className='deleteButton' onClick={deletePost}>Delete Me!</button>
      </div>
    </div>
  );
};
export default Post;
