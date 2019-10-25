import React, { Component } from 'react'
import Axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import { Route } from 'react-router-dom';
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
        this.props.history.push({pathname: "/"+ postId});
    }

    render() {
        let posts = <p>Something wrent wrong :-( !</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post =>
                //<Link to={"/post/"+post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={()=> this.postSelectedHandler(post.id)}
                         />
                //</Link>
                )
        }

        return (
            <section className="Posts">
                {posts}
                <div>
                    <Route path={'/:id'} component={FullPost} />
                </div>
            </section>
        )
    }
}

export default Posts
