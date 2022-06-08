import express from 'express'
import { getBugs, createBug, updateBug, deleteBug, resolveBug, devRespond } from '../Controllers/bugsController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/', getBugs)
router.post('/', createBug)
router.put('/:id', auth, updateBug)
router.delete('/:id', auth, deleteBug)
router.put('/:id/isResolved', auth, resolveBug)
router.put('/:id/devRespond', auth, devRespond)

export default router;