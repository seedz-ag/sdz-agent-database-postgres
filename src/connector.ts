import { ConnectorInterface, DatabaseRow } from "sdz-agent-types";

import { Client } from "pg";

export default class Connector implements ConnectorInterface {
  private connection: Client;

  private config: any;

  constructor(config: any) {
    this.setConfig(config);
  }

  getVersion() {
    //TODO: Implement
    return "n/a";
  }

  async connect(): Promise<void> {
    if (!this.connection) {
      try {
        this.connection = new Client({
          user: this.config.username,
          password: this.config.password,
          host: this.config.host,
          database: this.config.schema,
          port: this.config.port,
        });
        await this.connection.connect();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async close(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.end();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async execute(query: string): Promise<DatabaseRow[]> {
    let resultSet: DatabaseRow[] = [];
    if (!this.connection) {
      await this.connect();
    }
    try {
      const response = await this.connection.query<any[]>(query);
      if (response) {
        resultSet = response[0];
      }
    } catch (e) {
      console.log(e);
    }
    return resultSet;
  }

  private setConfig(config: any): this {
    this.config = config;
    return this;
  }
}
