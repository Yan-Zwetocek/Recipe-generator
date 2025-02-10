import { makeAutoObservable } from "mobx";
import AuthService from '../Services/auth-service'
import axios from "axios";

export default class UserStore {
    
 constructor() {
  this._isAuth = false;
  this._user = {
   id: null,
   userName: '',
   email: '',
   role: '',
   avatar: null,
  };

  makeAutoObservable(this);
 }

 setIsAuth(bool) {
  this._isAuth = bool;
 }
 
 setUser(user) {
     if (typeof user !== 'object' || user === null) {
         console.error('Ошибка: UserStore.setUser: user должен быть объектом.');
         console.log(user)
         return;
        }
        
        this._user = { ...this._user, ...user }; // Обновление свойств пользователя
    }
    
   
    
    get isAuth() {
        return this._isAuth;
    }
    
    get user() {
        return this._user;
    }
    setAccess(role) {
     return this._user.role = role;
    }
   async login(email, password ){
    try{
        const response = await AuthService.login(email.value, password.value)
        localStorage.setItem('token', response.accessToken);
        this.setIsAuth(true)
        this.setUser(response.data.user)
         
    } catch(e){
        alert(e.response.data.message)
    }
   } 
   async registration(email, password, username ){
    try{
        const response = await AuthService.registration(email.value, password.value, username.value)
        localStorage.setItem('token', response.accessToken);
        this.setIsAuth(true)
        this.setUser(response.user)
        
         
    } catch(e){
        alert(e.response.data.message)
        
    }
   } 
   async checkAuth( ){
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken);
        this.setIsAuth(true)
        this.setUser(response.data.user)
        
         
    } catch(e){
        alert(e.response.data.message)
    }
   } 
   async logout(){
    try{
        const response = await AuthService.logout()
        localStorage.removeItem('token',);
        this.setIsAuth(false)
        this.setUser({})
         
    } catch(e){
        alert(e.response.data.message)
    }
   } 
   }


