import { Router } from 'express'
import controller from '../controllers/user.js'

const router = Router()

router.get('/',controller.GET)
router.post('/',controller.POST)
router.put('/',controller.PUT)


export default router;