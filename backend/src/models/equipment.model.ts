import mongoose, { Schema, Document } from 'mongoose';

export interface IEquipment extends Document {
    name: string;
    type: string;
    status: string;
    ip: string;
    os: string;
    lastSeen: string;
}

const EquipmentSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, default: 'online' },
    ip: { type: String, default: '0.0.0.0' },
    os: { type: String, default: 'Unknown' },
    lastSeen: { type: String, default: 'à l\'instant' }
}, {
    timestamps: true 
});

EquipmentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (ret) => {
        delete ret._id;
    }
});

export const EquipmentModel = mongoose.model<IEquipment>('Equipment', EquipmentSchema);
