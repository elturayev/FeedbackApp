import { Router } from 'express'
import controller from '../controllers/category.js'

const router = Router()

router.get('/', controller.GET)


export default router;