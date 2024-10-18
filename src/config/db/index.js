const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        // mongoose.set('strictQuery', false)
        await mongoose.connect('mongodb://127.0.0.1:27017/landing_page_2', {});
        // await mongoose.connect('mongodb+srv://lehai10101010:tien20194184@profuct.ldkskcc.mongodb.net?retryWrites=true&w=majority', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };
