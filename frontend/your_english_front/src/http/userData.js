const url = "http://localhost:8080/api";
export async function getWordbases() {
  return await fetchDataWithToken(`${url}/wordbases`, "get");
}

async function fetchDataWithToken(url, method, body) {
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
  });
  if (response.ok) {
    const data = await response.json();
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
