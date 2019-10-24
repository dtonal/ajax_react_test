import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';

import './Blog.css';

import Axios from 'axios';

class Blog extends Component {

    state = { posts: [], error: false };

    componentDidMount() {
        Axios.get('/posts').then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Torben'
                }
            })
            this.setState({ posts: updatedPosts });
        }).catch(err => {
            console.log(err);
            this.setState({ error: true });
        });
    }

    postSelectedHandler = (postId) => {
        this.setState({ selectedPostId: postId })
    }


    render() {
        let posts = <p>Something wrent wrong :-( !</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => <Post
                title={post.title}
                author={post.author}
                key={post.id}
                clicked={() => this.postSelectedHandler(post.id)} />);
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;