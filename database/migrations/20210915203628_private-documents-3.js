const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(document_privacy_id) => "documents"
 * addColumn(document_id) => "document_privacy_customers"
 *
 */

const info = {
  revision: 7,
  name: "private-documents-3",
  created: "2021-09-15T20:36:28.852Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["documents", "document_privacy_id", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "document_privacy_customers",
      "document_id",
      {
        type: Sequelize.INTEGER,
        field: "document_id",
        comment: "The document that is private",
        references: { model: "documents", key: "document_id" },
        allowNull: false,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["document_privacy_customers", "document_id", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "documents",
      "document_privacy_id",
      {
        type: Sequelize.INTEGER,
        field: "document_privacy_id",
        comment:
          "The ID of table document_private that indicates the exclusive owner of it. If has an id, means it is private and not available for other customers",
        references: {
          model: "document_privacy_customers",
          key: "document_privacy_id",
        },
        allowNull: true,
      },
      { transaction },
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
