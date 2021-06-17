import { Request, Response, NextFunction } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  getContent().then(x => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    console.log(x);
    try {
      const data = fs.readFileSync(
        path.resolve(__dirname, '../public/inc.html'),
        'utf8'
      );
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    res.set('Content-Type', 'application/json');
    res.send(x);
  });
};

export const getContent = (): Promise<any> => {
  const url = 'https://rawg.io/api/collections/must-play/games';

  // return new pending promise
  return new Promise((resolve, reject) => {
    const request = https.get(url, response => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error('Failed to load page, status code: ' + response.statusCode)
        );
      }
      // temporary data holder
      const body: any[] = [];
      // on every content chunk, push it to the data array
      response.on('data', chunk => body.push(chunk));
      // we are done, resolve promise with those joined chunks

      response.on('end', () => {
        const result = JSON.parse(`[${body.join('')}]`);
        resolve(result);
      });
    });
    // handle connection errors of the request
    request.on('error', err => reject(err));
  });
};
