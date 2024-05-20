import React, { useEffect, useState } from 'react';
import './Home.css';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase'; 
import deleteBtn from '../Assets/trash-can.png';
import editBtn from '../Assets/edit.png'; // Add an edit button image

const postsCollectionRef = collection(db, "posts");

const Home = ({ userEmail }) => {
  const [postsLists, setPostsLists] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

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

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setPostsLists((prevPosts) => prevPosts.filter(post => post.id !== id));
  };

  const startEditingPost = (post) => {
    setEditingPost(post);
  };

  const updatePost = async (id, updatedContent) => {
    const postDoc = doc(db, "posts", id);
    await updateDoc(postDoc, { content: updatedContent });
    setPostsLists((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, content: updatedContent } : post
      )
    );
    setEditingPost(null);
  };

  return (
    <div className="homePage">
      {postsLists.map((post) => (
        <div key={post.id} className="post">
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1> 
            </div> 
            {userEmail === post.author.email && (
              <div className="postActions">
                <button onClick={() => startEditingPost(post)}>
                  <img src={editBtn} alt="Edit" />
                </button>
                <button onClick={() => deletePost(post.id)}>
                  <img src={deleteBtn} alt="Delete" />
                </button>
              </div>
            )}
          </div>

          <div className="postTextContainer">
            {editingPost && editingPost.id === post.id ? (
              <div className="editPostContainer">
                <textarea
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                />
                <button onClick={() => updatePost(post.id, editingPost.content)}>Save</button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </div>
            ) : (
              <p>{post.content}</p>
            )}
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
