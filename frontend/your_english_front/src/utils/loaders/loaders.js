import { getWordbases } from "../../http/userData";
export async function homeLoader() {
  console.log(getWordbases);
  const wordbases = await getWordbases();
  if (wordbases === null) {
    throw new Error("Wordbases not found");
  }
  console.log(wordbases);
  return wordbases;
}
