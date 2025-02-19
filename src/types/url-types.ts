export interface ShortenedURL {
  id: string;
  originalURL: string;
  shortenURL: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResponse<T> {
  _succes: boolean;
  _data: T;
  _message: string;
  _metadata: {
    timeStamp: string;
    version: string;
  };
}
