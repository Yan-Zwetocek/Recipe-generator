import { $authHost, $host } from "../http"

export default class  IngredientService{
    static async crate (name, dimensionUnits, calories, fat, proteins, cards){
        return $authHost.post('api/ingredient' , name, dimensionUnits, calories, fat, proteins, cards )
      } 
    static async getAll (){
        return $host.get('api/ingredient')
      } 
    static async deleteById (id){
        return $authHost.delete(`api/ingredient/deleteById/${id}`)
      } 
}  