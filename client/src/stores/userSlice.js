//Importy
import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'universal-cookie';

//Variables
const cookies = new Cookies();
const getCookieValue = (cookieName) => cookies.get(cookieName);

//Slice do store pro uživatelsá data
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: getCookieValue('username') || null,
    id: getCookieValue('userID') || null,
    isAdmin: getCookieValue('isAdmin') || false,
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
  
  // Exporty
  export const { logoutUser, loginUser } = userSlice.actions

  export const selectUserName = (state) => state.user.name;
  export const selectUserId = (state) => state.user.id;
  export const selectIsAdmin = (state) => state.user.isAdmin;
  export const selectIsAdminLoggedIn = (state) => state.user.isAdmin && state.user.id !== null;

  export default userSlice.reducer