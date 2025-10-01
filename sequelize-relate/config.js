import { Sequelize } from "sequelize";


let sequelize = null;

sequelize = new Sequelize(
    "user_db",
    "root",
    "root",
    {
        host: "localhost",
        dialect: "mysql",
        logging: false,
    }
);


export default sequelize;
