import { config } from "../config";

export const addUrl = (cover: string) => {
  if (!cover) {
    return null;
  }

  const linkCover = `${config.serverPort}/booksCover/${cover}`;
  return linkCover
};