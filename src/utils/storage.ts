import * as fs from 'fs';
import * as path from 'path';

import { Sequelize, DataTypes, Model } from 'sequelize';

const storageLocation = path.join(
  path.dirname(path.dirname(path.dirname(path.resolve(__filename)))),
  'out'
);

const dbFilePath = path.join(storageLocation, 'db.sqlite');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: dbFilePath,
});

const Property = sequelize.define(
  'property',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    indexes: [{ unique: true, fields: ['id'] }],
  }
);

export async function initStorage() {
  if (!fs.existsSync(storageLocation)) {
    fs.mkdirSync(storageLocation);
  }

  await sequelize.sync({ alter: { drop: false } });
}

export async function saveProperty(id: string) {
  return await Property.build({ id }).save();
}

export async function isPropertyApplied(id: string) {
  const count = await Property.count({ where: { id } });
  return count > 0;
}
