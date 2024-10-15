import React from 'react';
import PosterHeader from '../../../Layouts/Components/Header/PosterHeader';
import PostsBoard from '../Components/PostsBoard';
import Footer from '../../../Layouts/Components/Footer/Footer';

const PostsPage = () => {
    return (
        <div>
            <div>
                <PosterHeader/>
            </div>
            <div style={{display:"flex", flexDirection:"column", width:"80%", margin:"auto", paddingTop:"50px", zIndex:"-20"}}>
                <PostsBoard/>
            </div>
            <div style={{display:"flex", flexDirection:"column", margin:"auto", paddingTop:"50px", zIndex:"-20"}}>
                <Footer/>
            </div>
        </div>
    );
};

export default PostsPage;