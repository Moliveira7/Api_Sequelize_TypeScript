// snake_case =  para lidar com o banco de dados
// camelCase = para lidar na nossa aplicação, que trata-se em js

import { Sequelize } from "sequelize";

const databaseUrl = process.env.DATABASE_URL || ''

export const sequelize = new Sequelize(databaseUrl, {
    define: {
        underscored: true
    }
})