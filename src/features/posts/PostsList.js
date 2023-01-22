import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const PostsList = () => {
  const posts = useSelector(state => state.posts)
  const history = useHistory();

  const renderedPosts = posts.map(post => (
    <article className="post-excerpt" key={post.id} onClick={ () => history.push(`/posts/${post.id}`) }>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList;