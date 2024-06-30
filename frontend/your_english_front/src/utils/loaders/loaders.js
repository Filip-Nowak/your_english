import {
  getUserData,
  getWordbase,
  getWordbases,
  getWordbasesWithCount,
} from "../../http/userData";
export async function homeLoader() {
  return null;
}
export async function sidebarLoader() {
  const wordbasesResponse = await getWordbases();
  const userResponse = await getUserData();
  return { wordbasesResponse: wordbasesResponse, userResponse: userResponse };
}
export async function wordbasesLoader() {
  const wordbasesResponse = await getWordbasesWithCount();
  return { wordbasesResponse: wordbasesResponse };
}
export async function singleWordBaseLoader({ params }) {
  const name = params.name;
  const wordbaseResponse = await getWordbase(name);
  return { wordbaseResponse: wordbaseResponse };
}
