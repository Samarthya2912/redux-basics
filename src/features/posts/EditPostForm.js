import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { postUpdated } from './postsSlice';

const EditPostForm = () => {
    const { id } = useParams();
    const post = useSelector(state =>
        state.posts.find(post => post.id === id)
    )

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({
                id, title, content
            }))

            history.push(`posts/${id}`);
        }

        setTitle('')
        setContent('')
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <button type="button" onClick={onSavePostClicked}>
                Save Post
            </button>
        </section>
    )
}

export default EditPostForm