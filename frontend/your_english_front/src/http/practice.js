import { fetchDataWithToken } from "./userData";

const url = "http://localhost:8080/api/practice";
export async function startFlashcards(wordbases) {
  let link = `${url}/flashcards?`;
  for (let wordbase of wordbases) {
    link += `w=${wordbase}&`;
  }
  link += `newSet=true&page=0`;
  return await fetchDataWithToken(link, "get");
}
export async function loadFlashCards(wordbases, page) {
  let link = `${url}/flashcards?`;
  for (let wordbase of wordbases) {
    link += `w=${wordbase}&`;
  }
  link += `page=${page}`;
  return await fetchDataWithToken(link, "get");
}
