export class CustomError<P> extends Error {
  localData: {
    message: string;
    status: number;
    payload?: P;
  };
}

export const customError = <P>(status: number, message: string, payload?: P) => {
  const error = new CustomError<P>(message);
  error.localData = {
    message,
    status,
    payload,
  };
  return error;
};
