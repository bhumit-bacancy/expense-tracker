import React, { useDebugValue, useState } from "react";

export default function Login(props) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    error: false,
    errorMsg: ""
  })

  useDebugValue(creds);
  function handleChange(e) {
    console.log(e.target);
    setError({error: false})
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(creds),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          if(data.type === 'Success') {
            localStorage.setItem("user", JSON.stringify(data.data.user));
            props.setUser({ user: data.data.user });
            setCreds({
              username: "",
              password: "",
            });
          } else {
            setError({
              error: true,
              errorMsg: data.message
            })
            console.log(data.message)
          }
        }
      );
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={creds.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="current-password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="password"
            value={creds.password}
            onChange={handleChange}
          />
        </div>
        {error.error && <div className="text-danger">{error.errorMsg}</div>}
        <button type="submit" className="btn btn-primary mt-2">
          Login
        </button>
      </form>
    </div>
  );
}
