import { Router } from 'express'
import controller from '../controllers/feedback.js'

const router = Router()

router.get('/',controller.GET)
router.post('/',controller.POST)
router.put('/',controller.PUT)
router.delete('/:feedback_id',controller.DELETE)


export default router;
