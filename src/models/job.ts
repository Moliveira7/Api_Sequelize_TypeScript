import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

interface JobAttributes {
  id: number;
  title: string;
  description: string;
  limitDate: Date;
  companyId: number;
}

export class Job extends Model<JobAttributes> implements JobAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public limitDate!: Date;
  public companyId!: number;

  // Add other methods and configurations as needed

}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    limitDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Job'
    // Add other options as needed
  }
);

export { JobAttributes }; // Exporte o tipo JobAttributes
