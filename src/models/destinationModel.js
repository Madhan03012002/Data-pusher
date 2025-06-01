import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Account from './accountModel.js';

const Destination = sequelize.define('Destination', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  account_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isUrl: true }
  },
  http_method: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['GET', 'POST', 'PUT', 'PATCH', 'DELETE']]
    }
  },
  headers: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {},
    validate: {
      isValidHeaders(value) {
        if (typeof value !== 'object' || value === null) {
          throw new Error('Headers must be a valid object');
        }
      }
    }
  }
}, {
  timestamps: true,
  paranoid: true,
  deletedAt: 'deletedAt',
  defaultScope: {
    attributes: { exclude: ['deletedAt'] }
  }
});

 Destination.associate = (models) => {
  Destination.belongsTo(models.Account, {
    foreignKey: 'account_id',
    onDelete: 'CASCADE'
  });
};

export default Destination;
