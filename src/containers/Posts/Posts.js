import React, { Component } from 'react'
import Axios from 'axios';
import Post from '../../components/Post/Post';
import { Link } from 'react-router-dom';
import './Posts.css';

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        Axios.get('/posts').then(response => {
            const posts = response.data.slice(0, 10);
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
            posts = this.state.posts.map(post =>
                <Link 
                    to={"/post/"+post.id}
                    key={post.id}
                    >
                    <Post
                        title={post.title}
                        author={post.author}
                         />
                </Link>)
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts
