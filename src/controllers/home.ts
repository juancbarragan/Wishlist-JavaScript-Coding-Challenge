import { Request, Response, NextFunction } from 'express';
import https from 'https';

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  getContent('https://rawg.io/api/collections/must-play/games').then(x => {
    console.log('result ');
    console.log(x);
  });
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.render('home', {
    title: 'Home'
  });
};

const getContent = (url: string): Promise<string> => {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response: any) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error('Failed to load page, status code: ' + response.statusCode)
        );
      }
      // temporary data holder
      const body: any[] = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk: any) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err: any) => reject(err));
  });
};

export const getTodos = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    https.get('https://jsonplaceholder.typicode.com/users?_limit=2', res => {
      if (res.statusCode !== 200) {
        console.error(
          `Did not get an OK from the server. Code: ${res.statusCode}`
        );
        res.resume();
        return;
      }

      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('close', () => {
        response.status(200).json(data);
      });
    });
  } catch (error) {
    throw error;
  }
};
