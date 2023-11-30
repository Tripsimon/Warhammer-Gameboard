import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: null,
        id: null

    },

    reducers: {
        logoutUser: (state) =>{
            state.name = null;
            state.id = null
        },

        loginUser: (state, action) => {
            state.name = action.payload.name
            state.id = action.payload.id
        }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { logoutUser, loginUser } = userSlice.actions
  
  export default userSlice.reducer