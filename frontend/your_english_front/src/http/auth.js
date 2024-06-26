const url = "http://localhost:8080/api";
export async function register(
  { name, email, password },
  onRegisterSuccess,
  onRegisterFail,
  onRequestFail
) {
  const body = JSON.stringify({ name: name, email: email, password: password });
  console.log(body);
  const response = await fetch(`${url}/auth/register`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, email: email, password: password }),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors === null) {
      onRegisterSuccess(data.token);
    } else {
      const errorsArr = data.errors.split(";");
      errorsArr.pop();
      const errors = {};
      for (let i = 0; i < errorsArr.length; i++) {
        const key = errorsArr[i].split(":")[0];
        const value = errorsArr[i].split(":")[1];
        errors[key] = value;
      }
      onRegisterFail(errors);
    }
  } else {
    onRequestFail(response);
  }
}
export async function login(
  { email, password },
  onLoginSuccess,
  onLoginFail,
  onRequestFail
) {
  const body = JSON.stringify({ email: email, password: password });
  const response = await fetch(`${url}/auth/authenticate`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors === null) {
      onLoginSuccess(data.token);
    } else {
      console.log(data.errors);
      const errorsArr = data.errors.split(";");
      errorsArr.pop();
      const errors = {};
      for (let i = 0; i < errorsArr.length; i++) {
        const key = errorsArr[i].split(":")[0];
        const value = errorsArr[i].split(":")[1];
        errors[key] = value;
      }
      onLoginFail(errors);
    }
  } else {
    onRequestFail(response);
  }
}
