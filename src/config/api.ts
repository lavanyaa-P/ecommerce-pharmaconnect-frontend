import axios from 'axios'

export const API_URL="http://www.localhost:5454"

export const api=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})