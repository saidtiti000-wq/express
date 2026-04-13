import { injectable } from 'inversify';
import { EquipmentModel, IEquipment } from '../models/equipment.model';
import { CreateEquipmentDto, UpdateEquipmentDto } from '../models/equipment.dto';

@injectable()
export class EquipmentService {
    public async getAllEquipment(): Promise<IEquipment[]> {
        await  new Promise (resolve => setTimeout (resolve , 3000));
        return await EquipmentModel.find({});
    }

    public async getEquipmentById(id: string): Promise<IEquipment | null> {
        await new Promise (resolve => setTimeout (resolve , 3000));
        return await EquipmentModel.findById(id);
    }

    public async deleteEquipment(id: string): Promise<void> {
        await new Promise (resolve => setTimeout (resolve, 3000));
        await EquipmentModel.findByIdAndDelete(id);
    }

    public async updateEquipment(id: string, data: UpdateEquipmentDto): Promise<IEquipment | null> {
        await new Promise (resolve => setTimeout(resolve, 3000));
        return await EquipmentModel.findByIdAndUpdate(id, data, { new: true });
    }

    public async createEquipment(data: CreateEquipmentDto): Promise<{ message: string, equipment: IEquipment }> {
        await  new Promise(resolve => setTimeout(resolve, 3000));
        console.log("l'equipement est cree dans bd", data);

        const newDevice = new EquipmentModel({
            name: data.name,
            type: data.type,
            status: data.status || 'offline',
            ip: data.ip || '0.0.0.0',
            os: data.os || 'Unknown',
            lastSeen: 'à l\'instant'
        });

        await newDevice.save();
        return {
            message: "equiprmrnt cree ",
            equipment: newDevice
        };
    }
}
