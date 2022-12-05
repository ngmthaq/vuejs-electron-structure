import DB_CONST from "@/const/db.const";
import BaseDatabase from "@/database/base.database";

class VersionsRepo {
  async createVersionsTable() {
    let sql = "CREATE TABLE IF NOT EXISTS " + VERSION_TABLE_NAME + " ( ";
    sql += Object.values(VERSION_TABLE_COLUMNS)
      .map(col => col.name + " " + col.datatype + " " + col.constraint)
      .join(", ");
    sql += " );";

    let db = new BaseDatabase();
    await db.openConnection();
    await db.setSql(sql);
    await db.setValues({});

    return db.execute();
  }

  async getLastVersion() {
    let db = new BaseDatabase();
    await db.openConnection();
    await db.setSql("SELECT * FROM " + VERSION_TABLE_NAME);
    await db.setValues({});

    return db.getLast();
  }

  async insertVersion() {
    let db = new BaseDatabase();
    await db.openConnection();
    await db.setSql(`INSERT INTO ${VERSION_TABLE_NAME} (version) VALUES ($version)`);
    await db.setValues({ $version: DB_CONST.version });

    return db.execute();
  }
}

export default VersionsRepo;

export const VERSION_TABLE_NAME = "versions";

export const VERSION_TABLE_COLUMNS = {
  id: { name: "id", datatype: "INTEGER", constraint: "PRIMARY KEY AUTOINCREMENT" },
  version: { name: "version", datatype: "INTEGER", constraint: "NOT NULL UNIQUE" },
};
