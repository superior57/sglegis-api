const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "audit_attachments", deps: []
 *
 */

const info = {
  revision: 2,
  name: "audit_attachment",
  created: "2021-09-20T12:57:06.227Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "audit_attachments",
      {
        audit_attachment_id: {
          type: Sequelize.INTEGER,
          field: "audit_attachment_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        audit_attachment_item_id: {
          type: Sequelize.INTEGER,
          field: "audit_attachment_item_id",
          Comment: "Auditoria que o anexo está associado.",
          allowNull: false,
        },
        audit_attachment_description: {
          type: Sequelize.STRING(200),
          field: "audit_attachment_description",
          allowNull: true,
        },
        audit_attachment_src: {
          type: Sequelize.STRING(268),
          field: "audit_attachment_src",
          allowNull: false,
        },
        audit_id: {
          type: Sequelize.INTEGER,
          field: "audit_id",
          Comment: "ID da auditoria que este item pertence",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["audit_attachments", { transaction }],
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
