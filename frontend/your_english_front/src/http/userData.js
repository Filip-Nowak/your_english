const url = "http://localhost:8080/api";
export async function getWordbases() {
  return await fetchDataWithToken(`${url}/wordbases`, "get");
}

export async function fetchDataWithToken(url, method, body) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return;
  }
  const response = await fetch(`${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return null;
  }
}

export async function getUserData() {
  return await fetchDataWithToken(`${url}/user`, "get");
}
export async function getWordbasesWithCount() {
  return await fetchDataWithToken(`${url}/wordbasesWithCount`, "get");
}
export async function createWordbase(name) {
  return await fetchDataWithToken(`${url}/wordbase`, "post", { name: name });
}
export async function deleteWordbase(name) {
  return await fetchDataWithToken(`${url}/wordbase/${name}`, "delete");
}
export async function getWordbase(name) {
  return await fetchDataWithToken(`${url}/wordbase/${name}`, "get");
}
export async function updateRelation(wordBaseName, number, word, meaning) {
  return await fetchDataWithToken(
    `${url}/wordbase/${wordBaseName}/relation/${number}`,
    "put",
    {
      word: word,
      meaning: meaning,
    }
  );
}
export async function addRelation(wordbaseName, word, meaning) {
  return await fetchDataWithToken(
    `${url}/wordbase/${wordbaseName}/relation`,
    "post",
    {
      word: word,
      meaning: meaning,
    }
  );
}
export async function deleteRelation(wordbaseName, number) {
  return await fetchDataWithToken(
    `${url}/wordbase/${wordbaseName}/relation/${number}`,
    "delete"
  );
}
