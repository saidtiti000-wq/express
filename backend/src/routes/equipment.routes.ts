import { Router } from 'express';
import { container } from '../di/inversify.config';
import { TYPES } from '../di/types';
import { EquipmentController } from '../controllers/equipment.controller';

const router = Router();
const equipmentController = container.get<EquipmentController>(TYPES.EquipmentController);

router.get('/', (req,res) => equipmentController.getAll(req,res));
router.get('/:id', (req, res) => equipmentController.getById(req, res));
router.post('/', (req, res) => equipmentController.create(req, res));
router.put('/:id', (req, res) => equipmentController.update(req, res));
router.delete('/:id', (req, res) => equipmentController.delete(req, res));

export default router;
