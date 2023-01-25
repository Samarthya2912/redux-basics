import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import { postDeleted } from './postsSlice';

const SinglePostPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const post = useSelector(state => state.posts.find(post => post.id === id));

  console.log(post);

  function deletePost() {
    dispatch(postDeleted({ id }));
    history.push("/");
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <br />
        <button onClick={() => { history.push(`/editpost/${id}`) }}>Edit</button>&nbsp;
        <button onClick={deletePost}>Delete</button>
      </article>
    </section>
  )
}

export default SinglePostPage