import { getUserData, getWordbases } from "../../http/userData";
export async function homeLoader() {
  return null;
}
export async function sidebarLoader() {
  const wordbasesResponse = await getWordbases();
  // if (wordbasesResponse === null || wordbasesResponse.error) {
  //   throw new Error(wordbasesResponse.message);
  // }
  const wordbases = wordbasesResponse.data;
  console.log(wordbases);
  const userResponse = await getUserData();
  const user = userResponse.data;
  // if (userResponse === null || userResponse.error) {
  //   throw new Error(userResponse.message);
  // }
  return { wordbases: wordbases, user: user };
}
