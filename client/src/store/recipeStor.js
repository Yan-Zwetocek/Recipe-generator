import { makeAutoObservable } from "mobx";

export default class RecipeStore {
  constructor() {
    this._recipes = []; // Массив объектов рецептов
    this._isLoading = false;
    this._error = null;
    this._selectedRecipe = null; // Для хранения выбранного рецепта
    this._page = 1;
    this._totalCount = 0;
    this._limit = 1;
    this._constantPage=0;
    this._constantRecipes=[];


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
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
  get constantPage() {
    return this._constantPage;
  }
  get constantRecipes() {
    return this._constantRecipes;
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
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setLimit(limit) {
    this._limit = limit;
  }
  setConstantPage(constantPage) {
    this._constantPage = constantPage;
  }
  
  setConstantRecipes(constantRecipes) {
    this._constantRecipes = constantRecipes;
  }
  
}
