import { ActionResponse, FetchOptions } from '@/types/global';
import { time } from 'console';
import { Error } from 'mongoose';
import logger from '../logger';
import handleError from './error';
import { config } from 'process';
import { RequestError } from '../http-error';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);

    clearTimeout(id);

    if (!response.ok)
      throw new RequestError(response.status, `HTTP Error: ${response.status}`);

    return await response.json();
  } catch (e) {
    const error = isError(e) ? e : new Error('Unknown error');

    if (error.name === 'AbortError') {
      logger.warn(`Request to ${url} timed out.`);
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error, 'api') as ActionResponse<T>;
  }
}
