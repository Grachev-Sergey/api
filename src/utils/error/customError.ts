export class CustomError extends Error{
  localData: {
    message: string;
    status: number;
    payload?: any;
  }
}

export const customError = (status: number, message: string, payload?: any) => {
  const error = new Error(message) as CustomError;
  error.localData = {
    message,
    status,
    payload
  }
  return error;
}
