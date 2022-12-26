//Сортировка по признаку и значению поля
//TODO типизация any
export function sortProductsByFieldAndType (sortType:string,sortFieldName:string){ //функция сортировки массива объектов по признаку(убывание,возрастание) и значению
  if (sortType === 'Descending') {
    return (a:any, b:any) => a[sortFieldName.toLowerCase()] > b[sortFieldName.toLowerCase()] ? -1 : 1;
  } else if(sortType === 'Ascending') {
    return (a:any, b:any) => a[sortFieldName.toLowerCase()] > b[sortFieldName.toLowerCase()] ? 1 : -1;
  }
}