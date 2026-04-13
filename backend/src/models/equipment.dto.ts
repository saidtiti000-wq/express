import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

type EquipmentStatus = 'online' | 'offline' | 'maintenance';

export class CreateEquipmentDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    type!: string;

    @IsOptional()
    @IsIn(['online', 'offline', 'maintenance'])
    status?: EquipmentStatus;

    @IsOptional()
    @IsString()
    ip?: string;

    @IsOptional()
    @IsString()
    os?: string;
}

export class UpdateEquipmentDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    type?: string;

    @IsOptional()
    @IsIn(['online', 'offline', 'maintenance'])
    status?: EquipmentStatus;

    @IsOptional()
    @IsString()
    ip?: string;

    @IsOptional()
    @IsString()
    os?: string;
}
