import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const refresh=useNavigate()
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    const data = await response.json()
    localStorage.setItem("token", data.token)
    if (data.user) {
      alert("Login successful")
      refresh('/dashboard')
    } else {
      alert(data.message)
      refresh("/login")
    }
  }

  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center my-5">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mx-5">
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required={true}
                  />
                </div>
                <br />
                <div className="mb-3 mx-5">
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required={true}
                  />
                </div>
                <br />
                <div className="text-center">
                  <input
                    className="btn btn-primary my-3 "
                    type="submit"
                    value="Login"
                  />
                </div>
                <div className="text-center">
                  <Link to="/forgot-password">
                    <input
                      className="btn btn-primary my-2 "
                      type="submit"
                      value="Forgot Password"
                    />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
