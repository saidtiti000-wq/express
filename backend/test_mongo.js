const mongoose = require('mongoose');

async function test() {
    await mongoose.connect('mongodb://127.0.0.1:27017/device-dashboard');
    const Equipschema = new mongoose.Schema({ name: String, type: String }, { strict: false });
    const Equipment = mongoose.model('Equipment', Equipschema);

    // Test fetch all to see IDs
    const all = await Equipment.find({});
    console.log("All IDs in database:", all.map(d => d._id.toString()));

    // Test fetch specific ID from user screenshot
    const id = "69c59d3d9766af67a9ce92c5";
    const doc = await Equipment.findById(id);
    console.log("Doc for", id, ":", doc ? doc.name : "Not Found (null)");

    process.exit(0);
}

test().catch(console.error);
