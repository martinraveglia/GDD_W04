import express from 'express';

import {
  exercise01,
  exercise02,
  exercise03,
  exercise04,
  exercise05,
  exercise06,
  exercise07,
  exercise08,
} from '../controllers/exercise';

const router = express.Router();

router.get('/01', exercise01);
router.get('/02', exercise02);
router.get('/03', exercise03);
router.get('/04', exercise04);
router.get('/05', exercise05);
router.get('/06', exercise06);
router.get('/07', exercise07);
router.get('/08', exercise08);

export default router;
