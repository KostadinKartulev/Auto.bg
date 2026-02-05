const mongoose = require('mongoose');

require('./ServiceRequest')
require('./CarPart');
require('./User');
require('./Order');

const connectionString = 'mongodb+srv://kokikartulev05:koki2005@clusterautobg.3uaq4gz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAutoBge';

async function initDb() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        })

    } catch (error) {
        console.error('Error with connection to database');
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = initDb;