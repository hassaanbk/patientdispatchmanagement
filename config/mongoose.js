var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.connect(config.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB... because:'+ err));
    
    require('../app/models/emergencyAlert.model');
    require('../app/models/motivationalTip.model');
    require('../app/models/user.model');
    require('../app/models/vitalSign.model');

    return db;
}