const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn(document_summary) => "documents"
 * changeColumn(document_status_id) => "documents"
 * changeColumn(document_date) => "documents"
 * changeColumn(document_number) => "documents"
 * changeColumn(document_type) => "documents"
 * changeColumn(document_scope_id) => "documents"
 *
 */

const info = {
  revision: 2,
  name: "increase-document-number-size",
  created: "2021-10-26T18:40:20.174Z",
  comment: "Increased document.document_number data field size and added some comments on it",
};

const migrationCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_summary",
      {
        type: Sequelize.STRING(5000),
        field: "document_summary",
        comment: "A small text that summarize the document text",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_status_id",
      {
        type: Sequelize.INTEGER,
        field: "document_status_id",
        comment: "The state id that this document applies (state model)",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_date",
      {
        type: Sequelize.DATE,
        field: "document_date",
        comment: "The date that this document was released",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_number",
      {
        type: Sequelize.STRING(100),
        field: "document_number",
        comment: "A control number of document",
        defaultValue: "S/N",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_type",
      {
        type: Sequelize.TEXT,
        field: "document_type",
        comment:
          "The type of document. Commonly is a law or standard rule (norm).",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_scope_id",
      {
        type: Sequelize.INTEGER,
        field: "document_scope_id",
        comment:
          "The scope this document can range (global, country, state or city) - (document_scopes model)",
        allowNull: false,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_summary",
      {
        type: Sequelize.STRING(2000),
        field: "document_summary",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_status_id",
      {
        type: Sequelize.INTEGER,
        field: "document_status_id",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_date",
      { type: Sequelize.DATE, field: "document_date", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_number",
      {
        type: Sequelize.STRING(50),
        field: "document_number",
        defaultValue: "S/N",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_type",
      { type: Sequelize.TEXT, field: "document_type", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_scope_id",
      { type: Sequelize.INTEGER, field: "document_scope_id", allowNull: false },
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
