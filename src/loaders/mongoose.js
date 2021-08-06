const mongoose = require('mongoose');
const config = require('../config/config');

const options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connectDB = () => {
    return mongoose.connect(config.db.host, options).then(() => console.log("MongoDB Successfully connected!")).catch(e => {
        console.log('Failed to connect to MongoDB!');
    })
}

connectDB();

exports.mongoose = mongoose
