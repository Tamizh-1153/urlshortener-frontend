import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const ViewShortUrl = () => {

    const [data,setData]=useState(null)
    const refresh=useNavigate()
    const token = localStorage.getItem("token")

    const {shortUrl}=useParams()

    useEffect(() => {
       if (token == null) {
         refresh("/login")
       } else {
         fetchData()
       }

    },[setData])

    const fetchData = async() =>{

        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/${shortUrl}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(response =>setData(response.data))

    }
    console.log(data)
    if(data!==null){
        window.location.href=data
    }


  return (
    <div></div>
  )
}

export default ViewShortUrl