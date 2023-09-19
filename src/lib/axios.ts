import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dt-money-gamma-sable.vercel.app:3333',
})
