import { $authHost, $host } from "../http"

export default class CuisinesService{
    static async crate (cuisine){
        return $authHost.post('api/cuisine' , cuisine)
      } 
    static async getAll (){
        return $host.get('api/cuisine')
      } 
    static async updateById (id){
        return $authHost.put(`api/cuisine/updateById/${id}`)
      } 
    static async deleteById (id){
        return $authHost.delete(`api/cuisine/deleteById/${id}`)
      } 
} 