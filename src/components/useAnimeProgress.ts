import { useEffect, useState } from "react";

export const useAnimeProgress = (code: string) => {
  const [activeEpisode, setActiveEpisode] = useState<string>("1");
  const [savedTime, setSavedTime] = useState<number>(0);

  useEffect(() => {
    const savedData = localStorage.getItem(code);
    if (savedData) {
      const { episode, time } = JSON.parse(savedData);
      setActiveEpisode(episode);
      setSavedTime(time);
    }
  }, [code]);

  return { activeEpisode, setActiveEpisode, savedTime };
};
