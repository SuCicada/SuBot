import {Connection} from "./sql_util";
import * as sqlite3 from 'sqlite3'
import * as sqlite from 'sqlite'
import {Database, Statement} from "sqlite";

// const splitter = require('sqlite');
//
// const sqlite3 = require('sqlite3').verbose();
//
export class SqliteConnection extends Connection {

    conn: Promise<void | sqlite.Database>

    constructor(dbFile: string, table: string) {
        super(dbFile, table);
        this.conn = sqlite.open({
            filename: dbFile,
            driver: sqlite3.cached.Database
        }).catch(r => console.error(r))
    }

    exec(sql, ...params: any[]) {
        return this.conn.then((c: Database) => c.run(sql, params))
    }


    select(sql, ...params: any[]) {
        return this.conn.then((c: Database) => c.get(sql, params))
    }

}
