import React from 'react';
import PostDetail from '../Components/PostDetail';
import PosterHeader from '../../../Layouts/Components/Header/PosterHeader';
import Footer from '../../../Layouts/Components/Footer/Footer';

const PostDetailPage = () => {
    return (
        <div>
            <div>
                <PosterHeader/>
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