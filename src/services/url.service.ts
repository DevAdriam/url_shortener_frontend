import { ShortenedURL } from "../types/url-types";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASED_URL;

export const shortenURL = async (url: string): Promise<ShortenedURL> => {
  try {
    const response = await axios.post(`${API_URL}/urls`, { url });
    return response.data._data;
  } catch (error) {
    throw new Error("Error shortening URL");
  }
};

export const getOriginalURL = async (
  shortenURL: string
): Promise<ShortenedURL> => {
  try {
    const response = await axios.get(`${API_URL}/urls/${shortenURL}`);
    return response.data._data;
  } catch (error) {
    throw new Error("Error getting URL");
  }
};
