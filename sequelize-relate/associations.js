import sequelize from "./config.js";
import { Ship } from "./ShipModel.js";
import { Captain } from "./CapitainModel.js";

// Define associations
Ship.hasMany(Captain, { foreignKey: "shipId", as: "captains", onDelete: "CASCADE" });
Captain.belongsTo(Ship, { foreignKey: "shipId", as: "ship" });

// Sync models
await sequelize.sync({ alter: true });
console.log("✅ Database synced!");
