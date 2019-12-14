import React from 'react'
import axios from 'axios'

const axiosWithAuth = () => {
    const token = localStorage.getItem('token')

    return(
        axios.create({
            baseURL: 'http://localhost:5000',
            Headers: {
                Authorization: `${token}`
            }
        })
    )
}

export default axiosWithAuth