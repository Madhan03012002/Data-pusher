 import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  
  logging: false,  
});

// Function to authenticate DB connection
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to SQLite database');
    await sequelize.sync(); // auto-create tables
    return true;
  } catch (error) {
    console.error('❌ Error connecting to SQLite:', error);
    throw new Error('Failed to connect to SQLite DB');
  }
};

// Optional: expose Sequelize instance
export const getDatabase = () => {
  return sequelize;
};
