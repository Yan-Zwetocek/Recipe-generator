import { $authHost, $host } from "../http"

export default class RecipeService {
  // Создание нового рецепта
  static async create(formData) {
    return $authHost.post("api/recipe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  

  // Получение всех рецептов
  static async getAll( cuisineId , categoryId, page, limit=5) {
    return $host.get("api/recipe", {params:{cuisineId, categoryId, page, limit}});
  }

  // Получение рецепта по ID
  static async getById(id) {
    return $host.get(`api/recipe/${id}`);
  }

  // Обновление рецепта по ID
  static async updateById(id, updatedData) {
    return $authHost.put(`api/recipe/${id}`, updatedData);
  }

  // Удаление рецепта по ID
  static async deleteById(id) {
    return $authHost.delete(`api/recipe/${id}`);
  }
}
