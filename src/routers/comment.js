import { Router } from 'express'
import controller from '../controllers/comment.js'

const router = Router()

router.get('/', controller.GET)


export default router;