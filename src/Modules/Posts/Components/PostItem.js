import React from "react";
import ReactMarkdown from "react-markdown";
import './PostItem.css';

export function formatFileName(filePath) {
  let name = filePath.replace(/^.*[\\/]/, '');
  name = name.replace(/\.[^/.]+$/, '');
  name = name.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
  return name;
}

export function extractDate(filePath) {
  const name = filePath.replace(/^.*[\\/]/, '');
  const match = name.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : '';
}

function PostItem({ post, onClick }) {
    const date = post.date || extractDate(post.fileName);
    return (
        <div className="post-item" onClick={onClick}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
              <h2 className="post-title" style={{ margin: 0 }}>{formatFileName(post.fileName)}</h2>
              {date && <span style={{ fontSize: '13px', color: '#888', fontWeight: '500' }}>{date}</span>}
            </div>
            <div className="post-content">
                <ReactMarkdown>{post.content.substring(0, 200) + "..."}</ReactMarkdown>
            </div>
      </div>
    )
}

export default PostItem;
