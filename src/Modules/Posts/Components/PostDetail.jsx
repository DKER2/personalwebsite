import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { formatFileName } from './PostItem.jsx';
import { importAllFiles } from './PostsBoard.jsx';
import './PostDetail.css';

function PostDetail() {
  const { postName } = useParams(); // Extract the post name from the URL
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts dynamically using require.context and fetch()
    const fetchPosts = async () => {
      try {
        const allPosts = await importAllFiles(require.context('../Assets/Posts', true, /\.md$/));

        // Find the specific post based on postName
        const post = allPosts.find((p) => p.fileName.replace(/^.*[\\/]/, '') === postName);

        if (post) {
          setPostContent(post.content); // Set the fetched post content
        } else {
          setError('Post not found'); // Set error if the post is not found
        }
      } catch (err) {
        setError('Error loading posts'); // Handle any errors during fetch
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [postName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <article className="post">
      <header className="post-header">
        <h1 className="post-title">{formatFileName(postName)}</h1> {/* Format the post name */}
      </header>
      <section className="post-content">
        <ReactMarkdown>{postContent}</ReactMarkdown> {/* Render the markdown content */}
      </section>
    </article>
  );
}

export default PostDetail;
