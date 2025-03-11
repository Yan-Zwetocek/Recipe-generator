import { makeAutoObservable } from "mobx";

export default class RecipeStore {
  constructor() {
    this._recipes = [
      {
        id: 1,
        name: "Пицца Маргарита",
        description: "Классическая пицца...",
        ingredients: [
          {
            name: "тесто",
            quantity: "250 г", // Added quantity
            nutrition: {
              calories: 200,
              protein: 5,
              carbs: 30,
              fat: 5,
            },
          },
          {
            name: "томаты",
            quantity: "100 г", // Added quantity
            nutrition: {
              calories: 20,
              protein: 1,
              carbs: 4,
              fat: 0.5,
            },
          },
          {
            name: "моцарелла",
            quantity: "150 г", // Added quantity
            nutrition: {
              calories: 300,
              protein: 20,
              carbs: 2,
              fat: 25,
            },
          },
        ],
            cuisine: "Итальянская",
            category: "Пицца",
            steps: [
              {
                text: "Раскатайте тесто...",
                imageUrl: "https://100foto.club/uploads/posts/2022-05/1653182402_4-100foto-club-p-pitstsa-margarita-s-kolbasoi-5.jpg", // Путь к изображению для 1 шага
              },
              {
                text: "Выложите томаты...",
                imageUrl: "https://100foto.club/uploads/posts/2022-05/1653182402_4-100foto-club-p-pitstsa-margarita-s-kolbasoi-5.jpg", // Путь к изображению для 2 шага
              },
              {
                text: "Посыпьте моцареллой...",
                imageUrl: "https://100foto.club/uploads/posts/2022-05/1653182402_4-100foto-club-p-pitstsa-margarita-s-kolbasoi-5.jpg", // Путь к изображению для 3 шага
              },
            ],
            userId: 1,
            user: {
              id: 1,
              userName: "Yan",
              avatar: "https://avatars.mds.yandex.net/i?id=a419f6400be1d4aa6362ba5421656b4d_l-10753427-images-thumbs&n=13",
            },
          }
          
          
    ]; // Массив объектов рецептов
    this._isLoading = false;
    this._error = null;
    this._selectedRecipe = null; // Для хранения выбранного рецепта

    makeAutoObservable(this);
  }

  get getRecipes() {
    return this._recipes;
  }

  get isLoading() {
    return this._isLoading;
  }

  get error() {
    return this._error;
  }

  get selectedRecipe() {
    return this._selectedRecipe;
  }

  setSelectedRecipe(recipe) {
    this._selectedRecipe = recipe;
  }
  setRecipes(recipes) {
    this._recipes = recipes;
  }
}