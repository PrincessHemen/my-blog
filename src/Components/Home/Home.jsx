import React, { useEffect, useState } from 'react';
import './Home.css';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase'; 
import deleteBtn from '../Assets/trash-can.png';

const postsCollectionRef = collection(db, "posts");

const Home = () => {
  const [postsLists, setPostsLists] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(posts); // Optional: for debugging purposes
        setPostsLists(posts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
    getPosts(); 
  }, []); // Empty dependency array

  const deletePost = async (id) => { // Accept id as parameter
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);

    // Remove the post from the state to update the UI
    setPostsLists((prevPosts) => prevPosts.filter(post => post.id !== id));
  };

  return (
    <div className="homePage">
      {postsLists.map((post) => (
        <div key={post.id} className="post">
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1> 
            </div> 
            <div className="deletePost">
              <button onClick={() => deletePost(post.id)}><img src={deleteBtn} alt="Delete" /></button>
            </div> 
          </div>

          <div className="postTextContainer">
            <p>{post.content}</p>
            <div className="authorInfo">
              <img src={post.author.profilePic} alt="Profile" className="profilePic" />
              <div className="authorDetails">
                <h3>@{post.author.name}</h3> 
                <p>{post.author.email}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
