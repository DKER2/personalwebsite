import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Modules/Homepage/Pages/HomePage';
import PostDetail from './Modules/Posts/Components/PostDetail';
import PostsPage from './Modules/Posts/Pages/PostsPage';
function App() {
  return (
    <Router basename="/personalwebsite">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postName" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
