import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Dashboard = () => {
  const refresh = useNavigate()
  const token = localStorage.getItem("token")
  const [data, setData] = useState(null)

  /* eslint-disable */
  useEffect(() => {
    if (token == null) {
      refresh("/login")
    } else {
      fetchData()
    }
  }, [setData])
  /* eslint-enable */

  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/shortUrl`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setData(response.data.shortUrls))
  }

  const handleSignOut = () => {
    refresh("/login")
    localStorage.removeItem("token")
  }

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "50px" }}
      >
        <button className="btn btn-primary" onClick={handleSignOut}>
          Log out
        </button>
      </div>
      <p style={{ display: "flex", justifyContent: "center", fontSize: 30 }}>
        Dashboard
      </p>
      <div style={{ margin: "50px" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">URL</th>
              <th scope="col">Short URL</th>
              <th scope="col">Views</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((datum) => (
              <tr key={datum._id}>
                <th scope="col">
                  <a style={{ textDecoration: "none" }} href={datum.url}>
                    {" "}
                    {datum.url}
                  </a>
                </th>
                <th scope="col">
                  <a style={{ textDecoration: "none" }} href={datum.shortUrl}>
                    {datum.shortUrl}
                  </a>
                </th>
                <th scope="col">{datum.views}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/UrlShortener" style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn btn-primary">URL Shortener</button>
        </div>
      </Link>
    </>
  )
}

export default Dashboard
