'use strict';
import express from 'express';
import fileUpload from 'express-fileupload';
import indexRouter from './src/routes/routes.js';
import { PORT } from './src/config/config.js';

const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads/',
  })
);

app.use('/', indexRouter);

app.use(express.static('downloads'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
