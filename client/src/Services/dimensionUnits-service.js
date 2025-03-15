import { $authHost, $host } from "../http"

export default class dimensionUnitsService{
    static async crate (dimensionUnits){
        return $authHost.post('api/dimensionUnits' , dimensionUnits)
      } 
    static async getAll (){
        return $host.get('api/dimensionUnits')
      } 
    static async getById (id){
        return $host.get(`api/dimensionUnits/getById/${id}`)
      } 
    static async updateById (id){
        return $authHost.put(`api/dimensionUnits/updateById/${id}`)
      } 
    static async deleteById (id){
        return $authHost.delete(`api/dimensionUnits/deleteById/${id}`)
      } 
} 