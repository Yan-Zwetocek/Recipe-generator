import { makeAutoObservable } from "mobx";

export default class UserStore {
 constructor() {
  this._isAuth = false;
  this._user = {
   id: null,
   userName: 'Yan',
   email: '',
   role: '',
   avatar: null,
  };

  makeAutoObservable(this);
 }

 setIsAuth(bool) {
  this._isAuth = bool;
 }

 setUser(user) {
  if (typeof user !== 'object' || user === null) {
   console.error('Ошибка: UserStore.setUser: user должен быть объектом.');
   return;
  }

  this._user = { ...this._user, ...user }; // Обновление свойств пользователя
 }

 logout() {
  this._isAuth = false;
  this._user = {
   id: null,
   userName: '',
   email: '',
   role: '',
   avatar: null,
  };
 }

 get isAuth() {
  return this._isAuth;
 }

 get user() {
  return this._user;
 }

 setAccess(role) {
  return this._user.role = role;
 }
}
