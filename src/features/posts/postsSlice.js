import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title, 
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content, userId } = action.payload;
            const existingPost = state.find(post => post.id === id);
            if(existingPost) {
                existingPost.title = title;
                existingPost.content = content;
                existingPost.user = userId;
            }
        },
        postDeleted(state, action) {
            let i = 0;
            while(state[i].id !== action.payload.id) i++;
            if(i < state.length) state.splice(i, 1);
        }
    }
});

export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;
export default postsSlice.reducer;