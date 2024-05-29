const mongoose = require('mongoose');

const homeSectionSchema = mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HomeSections = mongoose.model('HomeSections', homeSectionSchema);

module.exports = HomeSections;
