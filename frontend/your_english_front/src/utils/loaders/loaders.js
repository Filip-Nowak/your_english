import {
  startChoice,
  startConnect,
  startFlashcards,
  startInsert,
  startRandom,
} from "../../http/practice";
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
  console.log(wordbaseResponse);
  return { wordbaseResponse: wordbaseResponse };
}
export async function practiceLoader() {
  const wordbasesResponse = await getWordbases();
  return { wordbasesResponse: wordbasesResponse };
}
export async function flashcardsLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startFlashcards(params.w);
  if (response.error) {
    console.log(response.message);
    // window.location.href = "/";
    return null;
  }
  response.data.wordbases = params.w;
  return { response: response };
}

export async function choiceLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startChoice(params.w);
  return { response: response };
}

export async function insertLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startInsert(params.w);
  return { response: response };
}

export async function connectLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startConnect(params.w);
  return { response: response };
}

export async function randomLoader() {
  const params = getParams();
  if (params === undefined) {
    return null;
  }
  const response = await startRandom(params.w);
  return { response: response };
}
function getParams() {
  const query = window.location.search;
  const params = {};
  for (let param of query.substring(1).split("&")) {
    let [key, value] = param.split("=");
    value = decodeURIComponent(value);
    if (params[key] !== undefined) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]];
      }
      params[key].push(value);
    } else {
      params[key] = value;
    }
  }
  if (params.w === undefined) {
    window.location.href = "/practice";
    return;
  }
  if (!Array.isArray(params.w)) {
    params.w = [params.w];
  }
  return params;
}

export async function confirmLoader({ params }) {
  const token = params.token;
  const response = await fetch(
    `http://localhost:8080/api/auth/confirm?token=${token}`,
    { headers: { "Content-Type": "application/json" } }
  );
  console.log(response);
  const data = await response.json();
  return { error: data.error, message: data.message };
}
