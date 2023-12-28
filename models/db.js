const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://collagejvnx:WOItEdN7X37mB6PL@nodecrud.m2ruwfq.mongodb.net/?retryWrites=true&w=majority', {
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
