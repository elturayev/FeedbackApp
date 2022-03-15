import { Router } from 'express'
import controller from '../controllers/feedback.js'

const router = Router()

router.get('/',controller.GET)


export default router;