export class CustomError extends Error {
  localData: {
    message: string;
    status: number;
    payload?: object;
  };
}

export const customError = (status: number, message: string, payload?: object) => {
  const error = new CustomError(message);
  error.localData = {
    message,
    status,
    payload,
  };
  return error;
};
