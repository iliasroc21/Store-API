import{ createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const themes = {
    winter: 'winter',
    dracula: 'dracula',
};
 
const getThemeFromLocalStorage =()=>{
    return localStorage.getItem("theme") || themes.winter;
}
const getUserFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem('user')) || null ; 
}

const defaultValue = {
    user : getUserFromLocalStorage(), 
    theme : getThemeFromLocalStorage()
}

const userSlice =createSlice({
    name : 'user',
    initialState : defaultValue ,
    reducers :{
        loginUser :(state ,action)=>{
            console.log(action.payload);
            const user  ={...action.payload.user , token : action.payload.jwt};
            state.user = user ; 
            localStorage.setItem('user',JSON.stringify(user));


        } , 
        logoutUser:(state )=>{
            console.log("logout ")
            state.user =null ; 
            localStorage.removeItem('user');
            toast.success("You loged out of your account !!!!");

        } ,
        toggleTheme :(state)=>{
            console.log("toggleTheme");
            const {winter ,dracula} = themes ; 
            state.theme = state.theme === winter ? dracula : winter; 
            
            localStorage.setItem("theme",state.theme);
        


        }

    } 

});

export const {loginUser , logoutUser , toggleTheme} = userSlice.actions ;  
export default userSlice.reducer;