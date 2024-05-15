import React, { useState } from 'react';
import './CreatePost.css';
import { addDoc, collection } from 'firebase/firestore'; // Add the collection import
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase'; // Make sure you export db from your Firebase configuration

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const navigate = useNavigate(); // Move this outside the makePost function

  const makePost = async () => {
    // Add post logic here
    const postCollectionRef = collection(db, 'posts');

    await addDoc(postCollectionRef, {
      title: title,
      content: postContent,
      author: { name: localStorage.getItem('name'), email: localStorage.getItem('email'), profilePic: localStorage.getItem('profilePic') },
    });

    navigate('/');
  };

  const handlePostChange = (event) => {
    const textarea = event.target;
    setPostContent(textarea.value);

    // Reset the height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className='createPostPage'>
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title</label>
          <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="inputGp">
          <label>Post</label>
          <textarea 
            placeholder='Post...' 
            value={postContent} 
            onChange={handlePostChange} 
            style={{ overflow: 'hidden', resize: 'none' }} // To prevent manual resizing
          />
        </div>
        <button onClick={makePost}>Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
