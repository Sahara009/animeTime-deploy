import { searchFilterAnime } from "../api";

export const fetchRecommendations = async (genres: string[] | undefined) => {
  if (genres) {
    const recommendedAnime = await searchFilterAnime(
      "",
      genres.join(","),
      "",
      ""
    );
    return recommendedAnime;
  }
  return [];
};
