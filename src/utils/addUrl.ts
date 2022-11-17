import { config } from '../config';

export const addBookUrl = (cover: string) => {
  if (!cover) {
    return null;
  }

  const linkCover = `http://localhost:${config.serverPort}/booksCover/${cover}`;
  return linkCover;
};

export const addUserUrl = (cover: string) => {
  if (!cover) {
    return null;
  }

  const linkCover = `http://localhost:${config.serverPort}/${cover}`;
  return linkCover;
};
