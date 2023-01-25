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
    const [userId, setUserId] = useState(post.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const users = useSelector(state => state.users)


    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({
                id, title, content, userId
            }))

            history.push(`posts/${id}`);
        }

        setTitle('')
        setContent('')
    }

    const usersOptions = users.map(user => <option key={user.id} value={user.id}>
        {user.name}
    </option>)

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
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
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