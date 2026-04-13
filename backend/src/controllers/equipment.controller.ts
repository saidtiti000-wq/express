import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../di/types';
import { EquipmentService } from '../services/equipment.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateEquipmentDto, UpdateEquipmentDto } from '../models/equipment.dto';

@injectable()
export class EquipmentController {
    constructor(
        @inject(TYPES.EquipmentService) private equipmentService: EquipmentService
    ) { }




    

    public async getAll(req: Request, res: Response): Promise<void> {
        const result = await this.equipmentService.getAllEquipment();
        res.status(200).json(result);
    }





    public async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const equipment = await this.equipmentService.getEquipmentById(req.params.id);
            if (!equipment) {
                res.status(404).json({ error: "Équipement introuvable" });
                return;
            }
            res.status(200).json(equipment);
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }



    
    public async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            await this.equipmentService.deleteEquipment(req.params.id);
            res.status(200).json({ message: "Équipement supprimé" });
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression" });
        }
    }






    public async update(req: Request<{ id: string }, unknown, UpdateEquipmentDto>, res: Response): Promise<void> {
    const dto = plainToInstance(UpdateEquipmentDto, req.body);

    const errors = await validate(dto);
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const result = await this.equipmentService.updateEquipment(req.params.id, dto);
    if (!result) {
        res.status(404).json({ error: "Équipement introuvable" });
        return;
    }
    res.status(200).json(result);
    }






    public async create(req: Request<Record<string, never>, unknown, CreateEquipmentDto>, res: Response): Promise<void> {
        const dto = plainToInstance(CreateEquipmentDto, req.body);

        const errors = await validate(dto);
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const result = await this.equipmentService.createEquipment(dto);
        res.status(201).json(result);
    }
}




