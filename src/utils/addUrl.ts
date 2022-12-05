import { config } from '../config';

export const addUrl = (cover: string, folder: string) => {
  if (!cover) {
    return null;
  }

  const linkCover = `${config.baseUrl}/${folder}/${cover}`;
  return linkCover;
};
