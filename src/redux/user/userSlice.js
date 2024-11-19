import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading:false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error =null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            // console.log('User data saved to Redux:', action.payload);
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state) => {
            state.loading = false;
            state.error = "Sign-in failed";
        },
        signOutSuccess: (state) => {
            state.currentUser = null
            state.loading = false;
            state.error = null;
        }
    }
})

export const {signInStart, signInSuccess, signInFailure ,signOutSuccess} = userSlice.actions;
export default userSlice.reducer;