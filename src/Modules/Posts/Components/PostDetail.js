import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './PostDetail.css';

const importAllFiles = async (r) => {
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

function formatFileName(filePath) {
    // Step 1: Remove "./" or any path elements
    let fileName = filePath.replace(/^.*[\\/]/, ''); // This will remove any leading directory path
  
    // Step 2: Remove the file extension ".md"
    fileName = fileName.replace(/\.[^/.]+$/, ''); // Removes the extension
  
    // Step 3: Add spaces before capital letters (camel case to space-separated words)
    fileName = fileName.replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between lowercase and uppercase letters
  
    return fileName; // Final formatted string
}

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
