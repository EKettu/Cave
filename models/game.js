const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const gameSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  player_won: {
    type: Boolean,
    requred: true
  },
  batteries_used: {
    type: Number,
    required: true
  }
});

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Game', gameSchema);