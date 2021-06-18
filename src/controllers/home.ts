import { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { Game } from '../models/game';

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  console.log(req.params);
  getContent('https://rawg.io/api/collections/must-play/games').then(json => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    let result = fs.readFileSync(
      path.resolve(__dirname, '../public/inc.html'),
      'utf8'
    );

    let cards = '';

    try {
      json.forEach((r: Game) => {
        const data = fs.readFileSync(
          path.resolve(__dirname, '../public/card.html'),
          'utf8'
        );

        cards += data
          .replace('{{image}}', r.pictureUrl)
          .replace('{{name}}', r.name)
          .replace('{{released}}', r.released)
          .replace('{{game-id}}', r.id)
          .replace('{{game-name}}', r.name);
      });
    } catch (err) {
      console.error(err);
    }

    result = result.replace('{{content}}', cards);

    // res.set('Content-Type', 'application/json');
    res.set('Content-Type', 'text/html');
    res.send(result);
  });
};

export const getContent = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const request = https.get(url, response => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error('Failed to load page, status code: ' + response.statusCode)
        );
      }

      const body: any[] = [];

      response.on('data', chunk => body.push(chunk));
      response.on('end', () => {
        const result = JSON.parse(body.join(''));

        resolve(
          result.results.map(
            (r: {
              name: any;
              released: any;
              background_image: any;
              id: any;
            }) => {
              const game: Game = {
                name: r.name,
                released: r.released,
                pictureUrl: r.background_image,
                id: r.id
              };
              return game;
            }
          )
        );
      });
    });

    request.on('error', err => reject(err));
  });
};
