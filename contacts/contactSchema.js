import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const contacts = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },owner: {
    type: String,
    ref: 'user',
  },
});

export const Contact = model('contact',contacts);