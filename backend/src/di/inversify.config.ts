import { Container } from 'inversify';
import { TYPES } from './types';
import { EquipmentService } from '../services/equipment.service';
import { EquipmentController } from '../controllers/equipment.controller';

const container = new Container();

container.bind<EquipmentService>(TYPES.EquipmentService).to(EquipmentService);
container.bind<EquipmentController>(TYPES.EquipmentController).to(EquipmentController);

export { container };
