import express from 'express';

import getMeterConsumption from '../controllers/meter.controller.js';

const router = express.Router();

router.get('/meters/:id', getMeterConsumption);

export default router;
