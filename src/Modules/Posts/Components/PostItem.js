import React from "react";
import ReactMarkdown from "react-markdown";
import './PostItem.css';

function formatFileName(filePath) {
    // Step 1: Remove "./" or any path elements
    let fileName = filePath.replace(/^.*[\\/]/, ''); // This will remove any leading directory path
  
    // Step 2: Remove the file extension ".md"
    fileName = fileName.replace(/\.[^/.]+$/, ''); // Removes the extension
  
    // Step 3: Add spaces before capital letters (camel case to space-separated words)
    fileName = fileName.replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between lowercase and uppercase letters
  
    return fileName; // Final formatted string
}

function PostItem({ post, onClick }) {
    return (
        <div className="post-item" onClick={onClick}>
            <h2 className="post-title">{formatFileName(post.fileName)}</h2>
            <div className="post-content">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
      </div>
    )
}

export default PostItem;