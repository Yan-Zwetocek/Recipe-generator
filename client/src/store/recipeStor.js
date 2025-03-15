import { makeAutoObservable } from "mobx";

export default class RecipeStore {
  constructor() {
    this._recipes = []; // Массив объектов рецептов
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
