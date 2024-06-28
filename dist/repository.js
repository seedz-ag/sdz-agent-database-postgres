"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdz_agent_types_1 = require("sdz-agent-types");
class RedshiftRepository extends sdz_agent_types_1.AbstractRepository {
    execute(query, page, limit) {
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
exports.default = RedshiftRepository;
