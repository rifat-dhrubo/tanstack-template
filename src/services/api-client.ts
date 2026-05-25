import Axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
	baseURL: 'https://petstore.swagger.io/v2',
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return AXIOS_INSTANCE({ ...config }).then(({ data }) => data);
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
