import { Router } from 'express'
import * as bodyParser from 'body-parser';

export const routes = Router();

// middleware
routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded());
