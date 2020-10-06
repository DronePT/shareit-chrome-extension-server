import Mongoose from 'mongoose';

export class Database {
  static database: Mongoose.Connection;

  static connect(): void {
    if (this.database) {
      return;
    }

    const { MONGO_URI: uri = 'mongodb://shareit:shareit@localhost:27017/shareit' } = process.env;

    Mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      authSource: 'admin',
    });

    this.database = Mongoose.connection;

    this.database.once('open', async () => {
      console.log('Connected to database');
    });

    this.database.on('error', () => {
      console.log('Error connecting to database');
    });
  }

  static disconnect(): void {
    if (!this.database) {
      return;
    }

    Mongoose.disconnect();
  }
}
