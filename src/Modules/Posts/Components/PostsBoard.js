import React, { useLayoutEffect, useState } from 'react';
import PostItem from './PostItem';
import { useNavigate } from 'react-router-dom';

export const importAllFiles = async (r) => {
    // Map each file and fetch its content as text
    const files = r.keys().map((fileName) => {
      return fetch(r(fileName))
        .then((response) => response.text())
        .then((text) => (
          {
          fileName,
          content: text,
        }));
    });
  
    // Wait for all fetch operations to complete
    return Promise.all(files);
  };

const PostsBoard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useLayoutEffect(() => {
    const loadPosts = async () => {
        const allPosts = await importAllFiles(require.context('../Assets/Posts/', true, /\.md$/));
        setPosts(allPosts); // Set the fetched posts content to state
        setLoading(false);
    };

    loadPosts();
  }, []);

  const navigateToPost = (post) => {
    console.log(post);
    navigate(`/posts/${post.fileName}`);
  };

  return (
    <div>
      {loading ? (
        <p>Loading posts...</p> // Show a loading message while posts are being fetched
      ) : (
        <ul>
          {posts.map((post) => (
            <PostItem key={post.fileName} post={post} onClick={() => navigateToPost(post)} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsBoard;
