const mongoose = require("mongoose")
const dbAsync = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/college_crm')
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Connection error', err));
}

module.exports= dbAsync;
