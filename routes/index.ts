import { Router } from 'express'
import { healthCheck } from './healthCheck'
import { hello } from './hello'

export const router = Router()

router.get('/', hello)
router.get('/health-check', healthCheck)