import React, { useLayoutEffect, useState } from 'react';
import PostItem from './PostItem';
import { useNavigate } from 'react-router-dom';

export const importAllFiles = async (r) => {
    const files = r.keys().map((fileName) => {
      return fetch(r(fileName))
        .then((response) => response.text())
        .then((text) => {
          const name = fileName.replace(/^.*[\\/]/, '');
          const match = name.match(/^(\d{4}-\d{2}-\d{2})/);
          return {
            fileName: name,
            date: match ? match[1] : '',
            content: text,
          };
        });
    });
    return Promise.all(files);
  };

const PostsBoard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const loadPosts = async () => {
        const allPosts = await importAllFiles(require.context('../Assets/Posts/', true, /\.md$/));
        allPosts.sort((a, b) => b.date.localeCompare(a.date));
        setPosts(allPosts);
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
        <p>Loading posts...</p>
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
