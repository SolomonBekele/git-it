import { Ship } from "./ShipModel.js";
import { Captain } from "./CapitainModel.js";
import sequelize from "./config.js";

// Run inside async function
(async () => {
    try {
        Ship.hasMany(Captain, { foreignKey: "shipId", as: "captains", onDelete: "CASCADE" });
        Captain.belongsTo(Ship, { foreignKey: "shipId", as: "ship" });

        // 2️⃣ Sync database
        await sequelize.sync({ alter: true });
        // 1️⃣ Create a ship
        const titanic = await Ship.create({ name: "Titanic", type: "Ocean Liner" });

        // 2️⃣ Create captains
        const smith = await Captain.create({ name: "Smith", rank: "Senior" });
        const andrews = await Captain.create({ name: "Andrews", rank: "Junior" });

        // 3️⃣ Initially no captains linked
        console.log(await titanic.getCaptains()); // []

        // 4️⃣ Add captains to ship
        await titanic.addCaptains([smith, andrews]);
        console.log(await titanic.countCaptains()); // 2

        // 5️⃣ Check if a captain belongs to the ship
        console.log(await titanic.hasCaptain(smith)); // true

        // 6️⃣ Remove a captain
        await titanic.removeCaptain(andrews);
        console.log(await titanic.countCaptains()); // 1

        // 7️⃣ Create a captain directly linked to ship
        await titanic.createCaptain({ name: "Johnson", rank: "Commander" });
        console.log(await titanic.countCaptains()); // 2

        // 8️⃣ Unassign all captains
        await titanic.setCaptains([]);
        console.log(await titanic.countCaptains()); // 0

        // 9️⃣ Fetch ship with all captains (include)
        const shipWithCaptains = await Ship.findOne({
            where: { name: "Titanic" },
            include: [{ model: Captain, as: "captains" }],
        });
        console.log(JSON.stringify(shipWithCaptains, null, 2));

        // 10️⃣ Destroy ship (CASCADE deletes linked captains)
        await titanic.destroy();
        console.log("🚢 Titanic has been dropped!");
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
})();
