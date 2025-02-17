import { $authHost, $host } from "../http"

export default class CategoryService{
    static async crate (category){
        return $authHost.post('api/category' , category)
      } 
    static async getAll (){
        return $host.get('api/category')
      } 
    static async updateById (id){
        return $authHost.put(`api/category/updateById/${id}`)
      } 
    static async deleteById (id){
        return $authHost.delete(`api/category/deleteById/${id}`)
      } 
} 