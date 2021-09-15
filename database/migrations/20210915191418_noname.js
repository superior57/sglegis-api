const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "document_privacy_customers", deps: []
 * addColumn(document_privacy_type) => "documents"
 * addColumn(document_privacy_id) => "documents"
 * changeColumn(document_state_id) => "documents"
 * changeColumn(document_city_id) => "documents"
 *
 */

const info = {
  revision: 4,
  name: "noname",
  created: "2021-09-15T19:14:18.202Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "document_privacy_customers",
      {
        document_privacy_id: {
          type: Sequelize.INTEGER,
          field: "document_privacy_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        customer_group_id: {
          type: Sequelize.INTEGER,
          field: "customer_group_id",
          comment: "The customer group that owns the document",
          allowNull: true,
        },
        customer_id: {
          type: Sequelize.INTEGER,
          field: "customer_id",
          comment: "The customer that owns the document",
          allowNull: true,
        },
        customer_unit_id: {
          type: Sequelize.INTEGER,
          field: "customer_unit_id",
          comment: "The customer unit that owns the document",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "documents",
      "document_privacy_type",
      {
        type: Sequelize.INTEGER,
        field: "document_privacy_type",
        comment:
          "0 = public (available for all customers) / 1 = private (need to check table document_privacy_customers)",
        defaultValue: 0,
        allowNull: false,
      },
      { transaction },
    ],
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
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_state_id",
      {
        type: Sequelize.INTEGER,
        field: "document_state_id",
        comment:
          "The region of country document is valid (filled when scope = state)",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_city_id",
      {
        type: Sequelize.INTEGER,
        field: "document_city_id",
        comment:
          "The city of region (state) document is valid (filled when scope = city)",
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["documents", "document_privacy_type", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["documents", "document_privacy_id", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["document_privacy_customers", { transaction }],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_state_id",
      {
        type: Sequelize.INTEGER,
        field: "document_state_id",
        Comment:
          "The region of country document is valid (filled when scope = state)",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "documents",
      "document_city_id",
      {
        type: Sequelize.INTEGER,
        field: "document_city_id",
        Comment:
          "The city of region (state) document is valid (filled when scope = city)",
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
