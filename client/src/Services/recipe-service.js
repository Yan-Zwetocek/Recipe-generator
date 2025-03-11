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
  static async getAll() {
    return $host.get("api/recipe");
  }

  // Получение рецепта по ID
  static async getById(id) {
    return $host.get(`api/recipes/${id}`);
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
