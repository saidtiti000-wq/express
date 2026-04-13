import 'reflect-metadata'; 
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import equipmentRoutes from './routes/equipment.routes';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://saidtii000_db_user:U3aEL30fdXSUA9ZK@cluster0.0xx2mcn.mongodb.net/?appName=Cluster0')
    .then(() => console.log('cnx avec succes (device-dashboard)'))
    .catch((err) => console.error('prob de cnnx a mongo', err));

app.use('/equipments', equipmentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`conn serv a  http://localhost:${PORT}`);
});
