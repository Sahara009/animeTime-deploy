import axios from "axios";
import { List, ListArray, ScheduleArray } from "../types/schedule.type";

export const axiosUrl = axios.create({
  baseURL: "https://api.anilibria.tv/v3/",
});

export const getTitleSchedule = async (): Promise<
  ScheduleArray | undefined
> => {
  const cachedData = localStorage.getItem("titleSchedule");
  if (cachedData) {
    return JSON.parse(cachedData) as ScheduleArray;
  }
  try {
    const response = await axiosUrl.get("title/schedule");
    const data = response.data as ScheduleArray;

    localStorage.setItem("titleSchedule", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching title schedule:", error);
  }
};
export const getTitleInfo = async (code: string) => {
  try {
    const response = await axiosUrl.get(
      `title?code=${code}&playlist_type=array`
    );
    return response.data as List;
  } catch (error) {
    console.error("Error fetching title info:", error);
  }
};
export const getAnimeUpdates = async (pageNumber: number) => {
  try {
    const response = await axiosUrl.get(
      `title/updates?limit=15&page=${pageNumber}`
    );
    return response.data.list as List[];
  } catch (error) {
    console.error("Error fetching list:", error);
  }
};
export const getRandomTitle = async () => {
  try {
    const response = await axiosUrl.get(`title/random`);
    console.log(response.data);
    return response.data as List | undefined;
  } catch (error) {
    console.error("Error fetching random:", error);
  }
};
export const searchAnime = async (query: string) => {
  try {
    const response = await axiosUrl.get(`title/search?search=${query}`);
    return response.data.list as ListArray | undefined;
  } catch (error) {
    console.error("Error fetching search:", error);
  }
};
export const searchFilterAnime = async (
  years: string,
  genres: string,
  season_code: string,
  selectedTypes: string
) => {
  try {
    const response = await axiosUrl.get(
      `title/search?year=${years}&genres=${genres}&limit=20&season_code=${season_code}&type=${selectedTypes}`
    );
    console.log(response);
    return response.data.list as List[] | undefined;
  } catch (error) {
    console.error("Error fetching filter:", error);
  }
};
export const getGenres = async () => {
  try {
    const response = await axiosUrl.get<string[]>(`genres`);

    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};
export const getYears = async () => {
  try {
    const response = await axiosUrl.get<number[]>(`years`);

    return response.data;
  } catch (error) {
    console.error("Error fetching years:", error);
  }
};
