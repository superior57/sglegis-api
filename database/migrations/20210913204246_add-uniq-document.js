const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeIndex(uniq_document) => "documents"
 * addIndex(uniq_audit_per_unit) => "audits"
 * addIndex(uniq_document) => "documents"
 *
 */

const info = {
  revision: 3,
  name: "add-uniq-document",
  created: "2021-09-13T20:42:46.078Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeIndex",
    params: ["documents", "uniq_document", { transaction }],
  },
  {
    fn: "addIndex",
    params: [
      "audits",
      ["item_area_aspect_id", "unit_id"],
      {
        indexName: "uniq_audit_per_unit",
        name: "uniq_audit_per_unit",
        indicesType: "UNIQUE",
        type: "UNIQUE",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "documents",
      [
        "document_number",
        "document_scope_id",
        "document_date",
        "document_state_id",
        "document_city_id",
      ],
      {
        indexName: "uniq_document",
        name: "uniq_document",
        indicesType: "UNIQUE",
        type: "UNIQUE",
        transaction,
      },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeIndex",
    params: ["audits", "uniq_audit_per_unit", { transaction }],
  },
  {
    fn: "removeIndex",
    params: ["documents", "uniq_document", { transaction }],
  },
  {
    fn: "addIndex",
    params: [
      "documents",
      ["document_number", "document_scope_id", "document_date"],
      {
        indexName: "uniq_document",
        name: "uniq_document",
        indicesType: "UNIQUE",
        type: "UNIQUE",
        transaction,
      },
    ],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
