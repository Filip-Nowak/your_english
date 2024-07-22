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
