import axios from "axios";
//import { axiosWrapper } from "./axiosWrapper"
const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const axiosWrapper = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: { ...defaultHeader },
});