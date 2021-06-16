import { Request, Response } from 'express';

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.render('home', {
    title: 'Home'
  });
};
