import React from "react";
import ReactMarkdown from "react-markdown";
import './PostItem.css';

export function formatFileName(filePath) {
  let fileName = filePath.replace(/^.*[\\/]/, '');
  fileName = fileName.replace(/\.[^/.]+$/, '');
  fileName = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  fileName = fileName.replace(/([a-z])([A-Z])/g, '$1 $2');
  return fileName;
}

export function extractDate(filePath) {
  let fileName = filePath.replace(/^.*[\\/]/, '');
  const match = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : '';
}

function PostItem({ post, onClick }) {
    return (
        <div className="post-item" onClick={onClick}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
              <h2 className="post-title" style={{ margin: 0 }}>{formatFileName(post.fileName)}</h2>
              <span style={{ fontSize: '13px', color: '#888', fontWeight: '500' }}>{extractDate(post.fileName)}</span>
            </div>
            <div className="post-content">
                <ReactMarkdown>{post.content.substring(0, 200) + "..."}</ReactMarkdown>
            </div>
      </div>
    )
}

export default PostItem;
