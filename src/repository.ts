import { AbstractRepository } from "sdz-agent-types";

export default class RedshiftRepository extends AbstractRepository {
  execute(query: string, page?: number, limit?: number): Promise<any> {
    const statement = [
      query,
      limit ? `LIMIT ${limit}` : null,
      page && limit ? `OFFSET ${page * limit}` : null,
    ]
      .filter((item) => !!item)
      .join(" ");
    return this.getConnector().execute(statement);
  }
}
