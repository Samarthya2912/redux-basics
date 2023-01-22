import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload);
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.find(post => post.id === id);
            if(existingPost) {
                existingPost.title = title;
                existingPost.content = content;
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