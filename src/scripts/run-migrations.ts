import dataSource from "../config/db";

async function runMigrations() {
  try {
    await dataSource.initialize();
    await dataSource.runMigrations();
    console.log("Migrations ran successfully.");
    await dataSource.destroy();
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

runMigrations();
