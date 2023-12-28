const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database Connected:', mongoose.connection.host);
    } catch (error) {
        console.error('Database Connection Error:', error.message);
    }
};

module.exports = connectDB;

require('./pegawai.model');
