const { Schema, model } = require("mongoose");

const productShema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerprice: {
        type: Number,
        required: false,
      },
    categorie: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },

    images: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    spotlight: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

module.exports = model("product", productShema);
