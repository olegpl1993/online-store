import data from '../data/database.json'

const products = data.products; // получаем обьект из json

export const state = products; // отсортированный обьект (текущее состояние)