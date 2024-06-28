"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class Connector {
    constructor(config) {
        this.setConfig(config);
    }
    getVersion() {
        //TODO: Implement
        return "n/a";
    }
    async connect() {
        if (!this.connection) {
            try {
                this.connection = new pg_1.Client({
                    user: this.config.username,
                    password: this.config.password,
                    host: this.config.host,
                    database: this.config.schema,
                    port: this.config.port,
                });
                await this.connection.connect();
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async close() {
        if (this.connection) {
            try {
                await this.connection.end();
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async execute(query) {
        let resultSet = [];
        if (!this.connection) {
            await this.connect();
        }
        try {
            const response = await this.connection.query(query);
            if (response) {
                resultSet = response[0];
            }
        }
        catch (e) {
            console.log(e);
        }
        return resultSet;
    }
    setConfig(config) {
        this.config = config;
        return this;
    }
}
exports.default = Connector;
