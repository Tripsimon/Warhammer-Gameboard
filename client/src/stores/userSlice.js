import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: null,
        id: null,
        isAdmin: false

    },

    reducers: {
        logoutUser: (state) =>{
            state.name = null;
            state.id = null;
            state.isAdmin = false;
        },

        loginUser: (state, action) => {
            const { username, id, isAdmin } = action.payload;
            state.name = username;
            state.id = id;
            state.isAdmin = isAdmin;
        }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { logoutUser, loginUser } = userSlice.actions

  export const selectUserName = (state) => state.user.name;
  export const selectUserId = (state) => state.user.id;
  export const selectIsAdmin = (state) => state.user.isAdmin;
  
  export const selectIsAdminLoggedIn = (state) => state.user.isAdmin && state.user.id !== null;

  export default userSlice.reducer