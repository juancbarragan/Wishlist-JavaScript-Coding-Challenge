import { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { Game } from '../models/game';

export const error = (req: Request, res: Response) => {
  processRequest(
    req,
    res,
    'https://rawg.io/api/collections/must-play/gamesxxxx'
  );
};

export const index = (req: Request, res: Response) => {
  processRequest(req, res, 'https://rawg.io/api/collections/must-play/games');
};

const processRequest = (req: Request, res: Response, url: string) => {
  getContent(url)
    .then(json => {
      res.header(
        'Cache-Control',
        'private, no-cache, no-store, must-revalidate'
      );
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');

      let result = fs.readFileSync(
        path.resolve(__dirname, '../public/result-template.html'),
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

        result = result.replace('{{content}}', cards);
      } catch (err) {
        const error = fs.readFileSync(
          path.resolve(__dirname, '../public/error-template.html'),
          'utf8'
        );

        result = result.replace('{{content}}', error);
      } finally {
        res.set('Content-Type', 'text/html');
        res.send(result);
      }
    })
    .catch(() => {
      res.header(
        'Cache-Control',
        'private, no-cache, no-store, must-revalidate'
      );
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');

      let result = fs.readFileSync(
        path.resolve(__dirname, '../public/result-template.html'),
        'utf8'
      );

      let error = fs.readFileSync(
        path.resolve(__dirname, '../public/error-template.html'),
        'utf8'
      );

      result = result.replace('{{content}}', error);
      res.set('Content-Type', 'text/html');
      res.send(result);
    });
};

export const getContent = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const request = https.get(url, response => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(response.statusCode.toString()));
      }

      const body: any[] = [];

      response.on('data', chunk => body.push(chunk));
      response.on('end', () => {
        let result = undefined;
        try {
          result = JSON.parse(body.join(''));

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
        } catch (err) {
          reject(err);
        }
      });
    });

    request.on('error', err => {
      reject(err);
    });
  });
};
