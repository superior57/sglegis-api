const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(document_city_id) => "documents"
 * addColumn(document_state_id) => "documents"
 *
 */

const info = {
  revision: 85,
  name: "documents_table_added_two_columns",
  created: "2021-07-28T07:22:20.752Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "documents",
      "document_city_id",
      { type: Sequelize.INTEGER, field: "document_city_id", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "documents",
      "document_state_id",
      { type: Sequelize.INTEGER, field: "document_state_id", allowNull: true },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["documents", "document_city_id", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["documents", "document_state_id", { transaction }],
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
