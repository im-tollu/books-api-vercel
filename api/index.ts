import express, { Router } from 'express'
import { statusRoutes } from '../routes/statusRoutes';

const app = express();

const appRouter = Router()
app.use('/api', appRouter)

appRouter.use('/', statusRoutes())

export default app