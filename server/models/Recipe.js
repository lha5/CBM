const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
//   writer: {
//       type: Schema.Types.ObjectID,
//       ref: 'User'
//   },
  title : {
      type: String,
      maxLength: 100,
      required: true
  },
  content : {
      type: String,
      required: true
  },
  category: {
      type: Number
  },
  images: {
      type: Array,
      default: []
  },
  views: {
      type: Number,
      default: 0
  }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;