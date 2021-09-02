export type APISuccess<T> = {
  success: true;
  data: T;
};

export type APIFail = {
  success: false;
  message: string;
};

export type APIResult<T> = APISuccess<T> | APIFail;
