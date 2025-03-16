import { $authHost, $host } from "../http"

export default class CommentService{
    static async crate (comment){
        return $authHost.post('api/comment' , comment)
      } 
    static async getAllByRecipeId (recipeId){
        return $host.get(`api/comment/${recipeId}`)
      } 
    static async updateById (id){
        return $authHost.put(`api/comment/updateCommentsByRecipeId/${id}`)
      } 
    static async deleteById (id){
        return $authHost.delete(`api/comment/deleteCommentsByRecipeId/${id}`)
      } 
} 