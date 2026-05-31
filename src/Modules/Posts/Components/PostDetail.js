import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { formatFileName } from './PostItem';
import { importAllFiles } from './PostsBoard';
import './PostDetail.css';

function PostDetail() {
  const { postName } = useParams();
  const [postContent, setPostContent] = useState('');
  const [postDate, setPostDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await importAllFiles(require.context('../Assets/Posts', true, /\.md$/));
        const post = allPosts.find((p) => p.fileName === postName);

        if (post) {
          setPostContent(post.content);
          setPostDate(post.date || '');
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Error loading posts');
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
        <h1 className="post-title">{formatFileName(postName)}</h1>
        {postDate && <p className="post-date" style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>{postDate}</p>}
      </header>
      <section className="post-content">
        <ReactMarkdown>{postContent}</ReactMarkdown>
      </section>
    </article>
  );
}

export default PostDetail;
