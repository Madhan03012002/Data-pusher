import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import crypto from 'crypto';

const Account = sequelize.define('Account', {
  account_id: {
    type: DataTypes.UUID,   
    primaryKey: true,     
    allowNull: false,
    defaultValue: () => crypto.randomUUID()
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  account_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  app_secret_token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => crypto.randomBytes(32).toString('hex')
  },
  website: DataTypes.STRING
}, {
  hooks: {
    beforeValidate: (account) => {
      if (!account.account_id) {
        account.account_id = crypto.randomUUID();
      }
      if (!account.app_secret_token) {
        account.app_secret_token = crypto.randomBytes(32).toString('hex');
      }
    }
  }
});

export default Account;