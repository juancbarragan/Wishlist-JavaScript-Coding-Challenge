import express from 'express';
import path from 'path';
import * as homeController from './controllers/home';
import sass from 'node-sass';
import packageImporter from 'node-sass-package-importer';

const options = {
  cwd: process.cwd(),
  packageKeys: ['scss', '../public/main.scss'],
  packagePrefix: '~'
};

sass.render(
  {
    importer: packageImporter(options)
  },
  () => {}
);

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

app.get('/', homeController.index);

export default app;
