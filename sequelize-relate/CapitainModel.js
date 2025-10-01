import { DataTypes } from "sequelize";
import sequelize from "./config.js";

export const Captain = sequelize.define("Captain", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rank: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
