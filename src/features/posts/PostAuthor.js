import React from 'react'
import { useSelector } from 'react-redux'

const PostAuthor = ({ userId }) => {
    const users = useSelector(state => state.users);
    const author = users.find(user => user.id === userId);
    console.log(users, author);

    return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor