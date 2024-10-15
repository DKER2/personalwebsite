import React from 'react';
import PostDetail from '../Components/PostDetail';
import Footer from '../../../Layouts/Components/Footer/Footer';
import Header from '../../../Layouts/Components/Header/Header';

const PostDetailPage = () => {
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div style={{display:"flex", flexDirection:"column", width:"80%", margin:"auto", paddingTop:"50px", zIndex:"-20"}}>
                <PostDetail/>
            </div>
            <div style={{display:"flex", flexDirection:"column", margin:"auto", paddingTop:"50px", zIndex:"-20"}}>
                <Footer/>
            </div>
        </div>
    );
};

export default PostDetailPage;