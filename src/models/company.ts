import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';
import { Job, JobAttributes } from './job'; // Importe JobAttributes corretamente

interface CompanyAttributes {
  id: number;
  name: string;
  bio: string;
  website: string;
  email: string;
}

interface CompanyCreationAttributes extends Omit<CompanyAttributes, 'id'> {}

export interface CompanyInstance extends Model<CompanyAttributes, CompanyCreationAttributes>, CompanyAttributes {
  // Utilize o tipo JobAttributes para representar a relação hasMany com Job
  jobs?: JobAttributes[];
}

const Company = sequelize.define<CompanyInstance>(
  'Company',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true // Pode ser null, conforme sua lógica de negócio
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true // Pode ser null, conforme sua lógica de negócio
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
);

// Defina a relação hasMany com Job
Company.hasMany(Job);

export { Company };
