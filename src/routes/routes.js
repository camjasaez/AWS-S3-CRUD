import { Router } from 'express';
import filesRoute from './files.route.js';

const indexRouter = Router();

indexRouter.use('/files', filesRoute);

export default indexRouter;
