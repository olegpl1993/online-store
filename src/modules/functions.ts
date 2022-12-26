import { Product } from "../types/types";
import { state } from "./state";

//Сортировка по признаку и значению поля
//TODO типизация any
/*
export function sortProductsByFieldAndType (sortType:string,sortFieldName:string){ //функция сортировки массива объектов по признаку(убывание,возрастание) и значению
  if (sortType === 'Descending') {
    return (a:any, b:any) => a[sortFieldName.toLowerCase()] > b[sortFieldName.toLowerCase()] ? -1 : 1;
  } else if(sortType === 'Ascending') {
    return (a:any, b:any) => a[sortFieldName.toLowerCase()] > b[sortFieldName.toLowerCase()] ? 1 : -1;
  }
}
*/

export function sortState(sortType: string) {
  if (sortType === 'priceup') state.sort((a: Product, b: Product) => a.price - b.price);
  if (sortType === 'pricedown') state.sort((a: Product, b: Product) => b.price - a.price);
  if (sortType === 'ratingup') state.sort((a: Product, b: Product) => a.rating - b.rating);
  if (sortType === 'ratingdown') state.sort((a: Product, b: Product) => b.rating - a.rating);
}
