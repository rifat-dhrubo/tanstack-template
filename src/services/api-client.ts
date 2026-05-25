import Axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

import { env } from '@/env';

export const AXIOS_INSTANCE = Axios.create({
	baseURL: env.VITE_API_BASE_URL,
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return AXIOS_INSTANCE({ ...config }).then(({ data }) => data);
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
