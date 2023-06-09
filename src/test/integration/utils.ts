import dotenv from 'dotenv';
import fetch, { RequestInit, Response } from 'node-fetch';

dotenv.config();

const { BASE_TEST_URL = 'http://localhost:3000' } = process.env;

export const baseUrl: string = BASE_TEST_URL;

type ResultAndStatus = { result: any; status: number };

async function methodAndParse(
  method: string,
  path: string,
  data: any = null,
  token: string | null = null
): Promise<ResultAndStatus> {
  const url = new URL(path, baseUrl);

  const headers: Record<string, string> = {};

  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== 'GET') {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data)
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const result: Response = await fetch(url, options);

  let json: any;

  try {
    json = await result.json();
  } catch (e) {
    if (method !== 'DELETE') {
      console.error('unable to parse json', e);
    }
  }

  return {
    result: json,
    status: result.status,
  };
}

export async function fetchAndParse(
  path: string, 
  token : string | null 
  ): Promise<ResultAndStatus> {
  return methodAndParse('GET', path, {} ,token);
}

export async function postAndParse(
  path: string,
  data: any,
  token: string | null
): Promise<ResultAndStatus> {
  return methodAndParse('POST', path, data, token);
}

export async function patchAndParse(
  path: string,
  data: any,
  token: string | null
): Promise<ResultAndStatus> {
  return methodAndParse('PATCH', path, data, token);
}

export async function deleteAndParse(
  path: string,
  data: any,
  token: string | null
): Promise<ResultAndStatus> {
  return methodAndParse('DELETE', path, data, token);
}

export async function loginAndGetToken(username : string, password : string): Promise<string> {
  const path = '/login';
  const data = { username, password };
  const { result, status } = await methodAndParse('POST', path, data);

  if (status !== 200 || !result.token) {
    throw new Error('Invalid login response');
  }

  return result.token;
}
