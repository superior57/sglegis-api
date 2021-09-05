const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(document_item_id) => "audits"
 * removeColumn(area_aspect_id) => "audits"
 * removeColumn(audit_control_action) => "audits"
 * removeColumn(audit_evidnece_compliance) => "audits"
 * removeColumn(audit_conformity) => "audits"
 * removeColumn(audit_practical_order) => "audits"
 * createTable() => "audit_items", deps: [audits]
 * addColumn(item_area_aspect_id) => "audits"
 * addColumn(unit_id) => "audits"
 * changeColumn(updatedAt) => "audits"
 *
 */

const info = {
  revision: 2,
  name: "audit_item",
  created: "2021-09-05T13:40:51.649Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["audits", "document_item_id", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["audits", "area_aspect_id", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["audits", "audit_control_action", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["audits", "audit_evidnece_compliance", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["audits", "audit_conformity", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["audits", "audit_practical_order", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "audit_items",
      {
        audit_item_id: {
          type: Sequelize.INTEGER,
          field: "audit_item_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        audits_audit_id: {
          type: Sequelize.INTEGER,
          field: "audits_audit_id",
          comment: "The id of audit which this item belongs to",
          references: { model: "audits", key: "audit_id" },
          allowNull: false,
        },
        audit_practical_order: {
          type: Sequelize.INTEGER,
          field: "audit_practical_order",
          comment: "If the document applies to the unit matched",
          allowNull: true,
        },
        audit_conformity: {
          type: Sequelize.INTEGER,
          field: "audit_conformity",
          comment:
            "If the unit matched is in conformity with the matched document item",
          allowNull: true,
        },
        audit_evidnece_compliance: {
          type: Sequelize.TEXT,
          field: "audit_evidnece_compliance",
          comment: "If unit is or not in conformity, whats the evidences",
          allowNull: true,
        },
        audit_control_action: {
          type: Sequelize.TEXT,
          field: "audit_control_action",
          comment:
            "Description of which actions is taken about this document on the matched unit",
          allowNull: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          field: "user_id",
          comment: "The user logged who inserted the audit",
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
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "audits",
      "item_area_aspect_id",
      {
        type: Sequelize.INTEGER,
        field: "item_area_aspect_id",
        comment: "The key matched document_id x area_id and aspect_id",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "audits",
      "unit_id",
      {
        type: Sequelize.INTEGER,
        field: "unit_id",
        comment: "The unit",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "audits",
      "updatedAt",
      { type: Sequelize.DATE, field: "updatedAt", allowNull: true },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["audits", "item_area_aspect_id", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["audits", "unit_id", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["audit_items", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "audits",
      "document_item_id",
      { type: Sequelize.INTEGER, field: "document_item_id", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "audits",
      "area_aspect_id",
      { type: Sequelize.INTEGER, field: "area_aspect_id", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "audits",
      "audit_control_action",
      { type: Sequelize.TEXT, field: "audit_control_action", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "audits",
      "audit_evidnece_compliance",
      {
        type: Sequelize.TEXT,
        field: "audit_evidnece_compliance",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "audits",
      "audit_conformity",
      { type: Sequelize.INTEGER, field: "audit_conformity", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "audits",
      "audit_practical_order",
      {
        type: Sequelize.INTEGER,
        field: "audit_practical_order",
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "audits",
      "updatedAt",
      { type: Sequelize.DATE, field: "updatedAt", allowNull: false },
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
