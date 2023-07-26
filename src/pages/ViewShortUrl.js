import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const ViewShortUrl = () => {
  const [data, setData] = useState(null)
  const refresh = useNavigate()
  const token = localStorage.getItem("token")

  const { shortUrl } = useParams()

  const fetchData = async () => {
    await axios
      .get(`https://urlshortener-backend-k3ro.onrender.com/${shortUrl}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setData(response.data))
  }
  console.log(data)
  if (data !== null) {
    window.location.href = data
  }

  /* eslint-disable */
  useEffect(() => {
    if (token == null) {
      refresh("/login")
    } else {
      fetchData()
    }
  }, [setData])
  /* eslint-enable */

  return <div></div>
}

export default ViewShortUrl
