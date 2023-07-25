import axios from "axios"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const UrlShortner = () => {
  const refresh = useNavigate()
  const token = localStorage.getItem("token")

  const handleSubmit = (e) => {
    e.preventDefault()
    const sendURL = e.target.url.value
    console.log(e.target.url.value)

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/shortUrl`,
        { url: sendURL },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        alert(response.data.message)
      })
      .catch((error) => alert(error.message))
  }

   /* eslint-disable */
  useEffect(() => {
    if (token == null) {
      refresh("/login")
    }
  }, [])
  /* eslint-enable */

  const handleSignOut = () => {
    refresh("/login")
    localStorage.removeItem("token")
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "50px",
        }}
      >
        <button
          className="btn btn-primary"
          onClick={() => refresh("/dashboard")}
        >
          Back
        </button>
        <button className="btn btn-primary" onClick={handleSignOut}>
          Log out
        </button>
      </div>
      <div className="container ">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center my-5">URL Shortener</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mx-5">
                    <input
                      className="form-control"
                      type="url"
                      name="url"
                      placeholder="Enter a URL"
                      required={true}
                    />
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary my-3" type="submit">
                      Create Short URL
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UrlShortner
