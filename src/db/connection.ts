import mongoose from 'mongoose';

let mongoURI: string = '';

if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.DB_URL || '';
} else {
  mongoURI = 'mongodb://localhost/crowstorm';
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

export default mongoose;
