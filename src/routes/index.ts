import express from 'express';

import exercise from './exercise';

const router = express.Router();

router.use('/exercise', exercise);

export default router;
