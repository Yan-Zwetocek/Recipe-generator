import {$authHost, $host} from '../http'

 export default class authService{
      static async login(email, password ){
        return $authHost.post('api/user/login' , {email, password})
      } 
      static async registration (email, password, username ){
        return $authHost.post('api/user/registration' , {email, password, username})
      } 
      static async logout (){
        return $authHost.post('api/user/logout' )
      } 
      static async getUserById(id) {
        return $authHost.get(`api/user/${id}`);
    }
    
        
 }