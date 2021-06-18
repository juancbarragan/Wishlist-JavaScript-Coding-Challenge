import * as shell from 'shelljs';

shell.mkdir('-p', 'dist/public');
shell.cp('-R', 'src/public/fonts', 'dist/public/');
shell.cp('-R', 'src/public/js', 'dist/public/');
shell.cp('-R', 'src/public/*.html', 'dist/public/');
shell.cp('-R', 'src/public/favicon.ico', 'dist/public/');
