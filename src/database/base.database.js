import { open } from "sqlite";
import { Database, verbose } from "sqlite3";
import DB_CONST from "@/const/db.const";

class BaseDatabase {
  constructor() {
    verbose();
    this.clearAll();
  }

  async getDbConnection() {
    return this.db;
  }

  async openConnection() {
    this.db = await open({
      filename: DB_CONST.name,
      driver: Database,
    });

    return this;
  }

  async setSql(sql = "") {
    this.sql = sql;

    return this;
  }

  async setValues(values = {}) {
    this.values = values;

    return this;
  }

  async getAll() {
    try {
      const stmt = await this.db.prepare(this.sql);
      await stmt.bind(this.values);
      const results = await stmt.all();
      await this.clearAll();

      return {
        isSuccess: true,
        data: results,
      };
    } catch (error) {
      console.error(error);
      await this.clearAll();

      return {
        isSuccess: false,
        data: [],
      };
    }
  }

  async getOne() {
    try {
      const stmt = await this.db.prepare(this.sql);
      await stmt.bind(this.values);
      const result = await stmt.get();
      await this.clearAll();

      return {
        isSuccess: true,
        data: result,
      };
    } catch (error) {
      console.error(error);
      await this.clearAll();

      return {
        isSuccess: false,
        data: {},
      };
    }
  }

  async getLast() {
    try {
      const stmt = await this.db.prepare(this.sql);
      await stmt.bind(this.values);
      const results = await stmt.all();
      const result = results.length > 0 ? results[results.length - 1] : null;
      await this.clearAll();

      return {
        isSuccess: Boolean(result),
        data: result,
      };
    } catch (error) {
      console.error(error);
      await this.clearAll();

      return {
        isSuccess: false,
        data: {},
      };
    }
  }

  async execute() {
    try {
      const stmt = await this.db.prepare(this.sql);
      await stmt.bind(this.values);
      await stmt.run();
      await this.clearAll();

      return true;
    } catch (error) {
      console.error(error);
      await this.clearAll();

      return false;
    }
  }

  async clearAll() {
    this.db = null;
    this.sql = "";
    this.values = {};
  }
}

export default BaseDatabase;
