import { Schema, model, models } from 'mongoose';

const BookSchema = new Schema({
  owner: {
    type: String,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  desc: {
    type: String,
  },
  src: {
    type: String,
    required: [true, 'Source is required.'],
  },
  price: {
    type: String,
    required: [true, 'Price is required.'],
  },
  offer: {
    type: String,
  }
});

const Book = models.Book || model('Book', BookSchema);

export default Book;