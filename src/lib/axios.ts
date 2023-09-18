import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dt-money-fawn-nine.vercel.app:3333',
})
