const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "actionplan_items", deps: []
 * createTable() => "actionplans", deps: []
 * createTable() => "areas", deps: []
 * createTable() => "audit_attachments", deps: []
 * createTable() => "audits", deps: []
 * createTable() => "customers_groups", deps: []
 * createTable() => "document_attachments", deps: []
 * createTable() => "document_items", deps: []
 * createTable() => "document_scopes", deps: []
 * createTable() => "document_status", deps: []
 * createTable() => "groups", deps: []
 * createTable() => "groups_users", deps: []
 * createTable() => "items_areas_aspects", deps: []
 * createTable() => "menus", deps: []
 * createTable() => "menus_groups", deps: []
 * createTable() => "responsibles_aspects", deps: []
 * createTable() => "states", deps: []
 * createTable() => "units_areas_aspects", deps: []
 * createTable() => "units_aspects_responsibles", deps: []
 * createTable() => "units_contacts", deps: []
 * createTable() => "areas_aspects", deps: [areas]
 * createTable() => "audit_items", deps: [audits]
 * createTable() => "cities", deps: [states]
 * createTable() => "ceps", deps: [cities, states]
 * createTable() => "customers", deps: [customers_groups]
 * createTable() => "customers_units", deps: [cities, states, customers]
 * createTable() => "documents", deps: [customers_units]
 * createTable() => "users", deps: [customers]
 * addIndex(uniq_area_name) => "areas_aspects"
 * addIndex(uniq_audit_per_unit) => "audits"
 * addIndex(uniq_document) => "documents"
 *
 */

const info = {
  revision: 1,
  name: "reset",
  created: "2021-10-03T09:43:34.754Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "actionplan_items",
      {
        actionplan_item_id: {
          type: Sequelize.INTEGER,
          field: "actionplan_item_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        actionplan_id: {
          type: Sequelize.INTEGER,
          field: "actionplan_id",
          comment: "The action plan which this item belong to",
          allowNull: false,
        },
        activity: {
          type: Sequelize.STRING(5000),
          field: "activity",
          comment: "The activity description",
          allowNull: false,
        },
        responsible: {
          type: Sequelize.STRING(50),
          field: "responsible",
          comment: "The name of responsible`s action plan",
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          field: "email",
          comment: "Email`s resposible",
          allowNull: true,
        },
        status: {
          type: Sequelize.INTEGER,
          field: "status",
          comment: "0:new/open; 2:closed; 3:removed",
          allowNull: false,
          default: 0,
        },
        deadline: {
          type: Sequelize.DATE,
          field: "deadline",
          comment: "The date responsible must finish the task",
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
    fn: "createTable",
    params: [
      "actionplans",
      {
        actionplan_id: {
          type: Sequelize.INTEGER,
          field: "actionplan_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        unit_id: {
          type: Sequelize.INTEGER,
          field: "unit_id",
          comment: "The unit",
          allowNull: false,
        },
        item_area_aspect_id: {
          type: Sequelize.INTEGER,
          field: "item_area_aspect_id",
          comment: "The item and aspect matched on unit",
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          field: "user_id",
          comment: "The user logged who inserted the action plan",
          allowNull: false,
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
    fn: "createTable",
    params: [
      "areas",
      {
        area_id: {
          type: Sequelize.INTEGER,
          field: "area_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        area_name: {
          type: Sequelize.STRING(100),
          field: "area_name",
          comment: "The Management System (former Area).",
          unique: true,
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
  {
    fn: "createTable",
    params: [
      "audits",
      {
        audit_id: {
          type: Sequelize.INTEGER,
          field: "audit_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        unit_id: {
          type: Sequelize.INTEGER,
          field: "unit_id",
          comment: "The unit",
          allowNull: false,
        },
        item_area_aspect_id: {
          type: Sequelize.INTEGER,
          field: "item_area_aspect_id",
          comment: "The key matched document_id x area_id and aspect_id",
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
    fn: "createTable",
    params: [
      "customers_groups",
      {
        customer_group_id: {
          type: Sequelize.INTEGER,
          field: "customer_group_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        customer_group_name: {
          type: Sequelize.STRING(50),
          field: "customer_group_name",
          comment: "customer group name",
          allowNull: false,
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
    fn: "createTable",
    params: [
      "document_attachments",
      {
        attachment_id: {
          type: Sequelize.INTEGER,
          field: "attachment_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        attachment_item_id: {
          type: Sequelize.INTEGER,
          field: "attachment_item_id",
          Comment: "Item do documento que o anexo está associado.",
          allowNull: false,
        },
        attachment_description: {
          type: Sequelize.STRING(200),
          field: "attachment_description",
          allowNull: true,
        },
        attachment_src: {
          type: Sequelize.STRING(268),
          field: "attachment_src",
          allowNull: false,
        },
        document_id: {
          type: Sequelize.INTEGER,
          field: "document_id",
          Comment: "ID do documento que este item pertence",
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
  {
    fn: "createTable",
    params: [
      "document_items",
      {
        document_item_id: {
          type: Sequelize.INTEGER,
          field: "document_item_id",
          Comment: "Id automático",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        document_item_number: {
          type: Sequelize.STRING(50),
          field: "document_item_number",
          Comment: "Código de identificação do documento (livre)",
          allowNull: false,
        },
        document_item_order: {
          type: Sequelize.INTEGER,
          field: "document_item_order",
          Comment: "Ordem de exibição na lista de itens",
          allowNull: false,
        },
        document_item_status_id: {
          type: Sequelize.INTEGER,
          field: "document_item_status_id",
          Comment: "Status do documento (document_status)",
          allowNull: false,
        },
        document_item_description: {
          type: Sequelize.TEXT,
          field: "document_item_description",
          Comment: "Descritivo do item",
          allowNull: true,
        },
        document_item_observation: {
          type: Sequelize.TEXT,
          field: "document_item_observation",
          Comment: "Observações do usuário ref. ao item",
          allowNull: true,
        },
        document_id: {
          type: Sequelize.INTEGER,
          field: "document_id",
          Comment: "ID do documento que este item pertence",
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
  {
    fn: "createTable",
    params: [
      "document_scopes",
      {
        document_scope_id: {
          type: Sequelize.INTEGER,
          field: "document_scope_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        document_scope_description: {
          type: Sequelize.STRING(100),
          field: "document_scope_description",
          comment:
            "Scope is the scope of the legal requirement in relation to the territory",
          unique: true,
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
  {
    fn: "createTable",
    params: [
      "document_status",
      {
        status_id: {
          type: Sequelize.INTEGER,
          field: "status_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        status_description: {
          type: Sequelize.STRING(100),
          field: "status_description",
          comment: "The status of document, like, if it is active or not",
          unique: true,
          allowNull: false,
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
    fn: "createTable",
    params: [
      "groups",
      {
        group_id: {
          type: Sequelize.INTEGER,
          field: "group_id",
          primaryKey: true,
          allowNull: false,
        },
        group_name: {
          type: Sequelize.STRING(45),
          field: "group_name",
          allowNull: true,
        },
        group_description: {
          type: Sequelize.STRING(100),
          field: "group_description",
          allowNull: true,
        },
        group_status: {
          type: Sequelize.STRING(1),
          field: "group_status",
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
    fn: "createTable",
    params: [
      "groups_users",
      {
        groups_group_id: {
          type: Sequelize.INTEGER,
          field: "groups_group_id",
          primaryKey: true,
          allowNull: false,
        },
        uesrs_user_id: {
          type: Sequelize.INTEGER,
          field: "uesrs_user_id",
          primaryKey: true,
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
  {
    fn: "createTable",
    params: [
      "items_areas_aspects",
      {
        item_area_aspect_id: {
          type: Sequelize.INTEGER,
          field: "item_area_aspect_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        area_id: {
          type: Sequelize.INTEGER,
          field: "area_id",
          allowNull: false,
        },
        area_aspect_id: {
          type: Sequelize.INTEGER,
          field: "area_aspect_id",
          allowNull: false,
        },
        document_item_id: {
          type: Sequelize.INTEGER,
          field: "document_item_id",
          allowNull: false,
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
    fn: "createTable",
    params: [
      "menus",
      {
        menu_id: {
          type: Sequelize.INTEGER,
          field: "menu_id",
          primaryKey: true,
          allowNull: false,
        },
        menu_name: {
          type: Sequelize.STRING(45),
          field: "menu_name",
          allowNull: true,
        },
        menu_link: {
          type: Sequelize.STRING(400),
          field: "menu_link",
          allowNull: true,
        },
        menu_icon: {
          type: Sequelize.STRING(45),
          field: "menu_icon",
          allowNull: true,
        },
        menu_status: {
          type: Sequelize.STRING(1),
          field: "menu_status",
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
    fn: "createTable",
    params: [
      "menus_groups",
      {
        menus_menu_id: {
          type: Sequelize.INTEGER,
          field: "menus_menu_id",
          primaryKey: true,
          allowNull: false,
        },
        groups_group_id: {
          type: Sequelize.INTEGER,
          field: "groups_group_id",
          primaryKey: true,
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
  {
    fn: "createTable",
    params: [
      "responsibles_aspects",
      {
        responsible_aspect_id: {
          type: Sequelize.INTEGER,
          field: "responsible_aspect_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        area_aspect_id: {
          type: Sequelize.INTEGER,
          field: "area_aspect_id",
          allowNull: false,
        },
        unit_aspect_responsible_id: {
          type: Sequelize.INTEGER,
          field: "unit_aspect_responsible_id",
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
  {
    fn: "createTable",
    params: [
      "states",
      {
        state_id: {
          type: Sequelize.INTEGER,
          field: "state_id",
          primaryKey: true,
          allowNull: false,
        },
        state_name: {
          type: Sequelize.STRING(45),
          field: "state_name",
          comment: "Brazilian State name",
          unique: true,
          allowNull: false,
        },
        uf: {
          type: Sequelize.STRING(2),
          field: "uf",
          comment: "Initials of brazilian state",
          unique: true,
          allowNull: false,
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
    fn: "createTable",
    params: [
      "units_areas_aspects",
      {
        unit_area_aspect_id: {
          type: Sequelize.INTEGER,
          field: "unit_area_aspect_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        area_id: {
          type: Sequelize.INTEGER,
          field: "area_id",
          allowNull: false,
        },
        area_aspect_id: {
          type: Sequelize.INTEGER,
          field: "area_aspect_id",
          allowNull: false,
        },
        customer_unit_id: {
          type: Sequelize.INTEGER,
          field: "customer_unit_id",
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
  {
    fn: "createTable",
    params: [
      "units_aspects_responsibles",
      {
        unit_aspect_responsible_id: {
          type: Sequelize.INTEGER,
          field: "unit_aspect_responsible_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        customer_unit_id: {
          type: Sequelize.INTEGER,
          field: "customer_unit_id",
          allowNull: false,
        },
        unit_aspect_responsible_name: {
          type: Sequelize.STRING(50),
          field: "unit_aspect_responsible_name",
          allowNull: true,
        },
        unit_aspect_responsible_email: {
          type: Sequelize.STRING(400),
          field: "unit_aspect_responsible_email",
          allowNull: true,
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
  {
    fn: "createTable",
    params: [
      "units_contacts",
      {
        unit_contact_id: {
          type: Sequelize.INTEGER,
          field: "unit_contact_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        unit_contact_name: {
          type: Sequelize.STRING(50),
          field: "unit_contact_name",
          allowNull: true,
        },
        unit_contact_email: {
          type: Sequelize.STRING(100),
          field: "unit_contact_email",
          allowNull: true,
        },
        unit_contact_phone: {
          type: Sequelize.STRING(25),
          field: "unit_contact_phone",
          allowNull: true,
        },
        unit_contact_observation: {
          type: Sequelize.STRING(200),
          field: "unit_contact_observation",
          allowNull: true,
        },
        unit_contact_customer_unit_id: {
          type: Sequelize.INTEGER,
          field: "unit_contact_customer_unit_id",
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
    fn: "createTable",
    params: [
      "areas_aspects",
      {
        area_aspect_id: {
          type: Sequelize.INTEGER,
          field: "area_aspect_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        area_aspect_name: {
          type: Sequelize.STRING(100),
          field: "area_aspect_name",
          comment: "The name of aspect",
          allowNull: false,
        },
        area_id: {
          type: Sequelize.INTEGER,
          field: "area_id",
          comment: "The id of the Management System (former Area)",
          references: { model: "areas", key: "area_id" },
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
    fn: "createTable",
    params: [
      "cities",
      {
        city_id: {
          type: Sequelize.INTEGER,
          field: "city_id",
          primaryKey: true,
          allowNull: false,
        },
        state_id: {
          type: Sequelize.INTEGER,
          field: "state_id",
          references: { model: "states", key: "state_id" },
          allowNull: true,
        },
        city_name: {
          type: Sequelize.STRING(100),
          field: "city_name",
          allowNull: true,
        },
        uf: { type: Sequelize.STRING(2), field: "uf", allowNull: true },
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
    fn: "createTable",
    params: [
      "ceps",
      {
        cep_id: {
          type: Sequelize.INTEGER,
          field: "cep_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        city_id: {
          type: Sequelize.INTEGER,
          field: "city_id",
          references: { model: "cities", key: "city_id" },
          allowNull: false,
        },
        state_id: {
          type: Sequelize.INTEGER,
          field: "state_id",
          references: { model: "states", key: "state_id" },
          allowNull: false,
        },
        type: { type: Sequelize.STRING(100), field: "type", allowNull: true },
        street_name: {
          type: Sequelize.STRING(200),
          field: "street_name",
          allowNull: true,
        },
        district_name: {
          type: Sequelize.STRING(100),
          field: "district_name",
          allowNull: true,
        },
        cep: { type: Sequelize.INTEGER, field: "cep", allowNull: false },
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
    fn: "createTable",
    params: [
      "customers",
      {
        customer_id: {
          type: Sequelize.INTEGER,
          field: "customer_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        customer_business_name: {
          type: Sequelize.STRING(100),
          field: "customer_business_name",
          comment: "The customer known name",
          allowNull: false,
        },
        customer_cnpj: {
          type: Sequelize.STRING(20),
          field: "customer_cnpj",
          comment: "Customer code",
          allowNull: false,
        },
        customer_group_id: {
          type: Sequelize.INTEGER,
          field: "customer_group_id",
          comment: "The group of its customer belongs to",
          references: { model: "customers_groups", key: "customer_group_id" },
          allowNull: true,
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
  {
    fn: "createTable",
    params: [
      "customers_units",
      {
        customer_unit_id: {
          type: Sequelize.INTEGER,
          field: "customer_unit_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        customer_unit_cnpj: {
          type: Sequelize.STRING(20),
          field: "customer_unit_cnpj",
          comment: "The company registration number",
          allowNull: false,
        },
        customer_unit_name: {
          type: Sequelize.STRING(100),
          field: "customer_unit_name",
          comment: "Unit name",
          allowNull: false,
        },
        customer_unit_address: {
          type: Sequelize.STRING(100),
          field: "customer_unit_address",
          comment: "The fisical location of unit",
          allowNull: true,
        },
        customer_unit_city_id: {
          type: Sequelize.INTEGER,
          field: "customer_unit_city_id",
          comment: "The city of unit",
          references: { model: "cities", key: "city_id" },
          allowNull: false,
        },
        customer_unit_uf_id: {
          type: Sequelize.INTEGER,
          field: "customer_unit_uf_id",
          comment: "The state of the unit",
          references: { model: "states", key: "state_id" },
          allowNull: false,
        },
        customer_unit_cep: {
          type: Sequelize.STRING(9),
          field: "customer_unit_cep",
          comment: "The ZIP Code of unit",
          allowNull: true,
        },
        customer_id: {
          type: Sequelize.INTEGER,
          field: "customer_id",
          comment: "The customer that belongs this unit",
          references: { model: "customers", key: "customer_id" },
          allowNull: false,
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
    fn: "createTable",
    params: [
      "documents",
      {
        document_id: {
          type: Sequelize.INTEGER,
          field: "document_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        document_scope_id: {
          type: Sequelize.INTEGER,
          field: "document_scope_id",
          allowNull: false,
        },
        document_type: {
          type: Sequelize.TEXT,
          field: "document_type",
          allowNull: true,
        },
        document_number: {
          type: Sequelize.STRING(50),
          field: "document_number",
          defaultValue: "S/N",
          allowNull: true,
        },
        document_date: {
          type: Sequelize.DATE,
          field: "document_date",
          allowNull: false,
        },
        document_status_id: {
          type: Sequelize.INTEGER,
          field: "document_status_id",
          allowNull: false,
        },
        document_summary: {
          type: Sequelize.STRING(2000),
          field: "document_summary",
          allowNull: false,
        },
        document_state_id: {
          type: Sequelize.INTEGER,
          field: "document_state_id",
          comment:
            "The region of country document is valid (filled when scope = state)",
          allowNull: true,
        },
        document_city_id: {
          type: Sequelize.INTEGER,
          field: "document_city_id",
          comment:
            "The city of region (state) document is valid (filled when scope = city)",
          allowNull: true,
        },
        document_privacy_type: {
          type: Sequelize.INTEGER,
          field: "document_privacy_type",
          comment:
            "0 = public (available for all customers) / 1 = private (need to check table document_privacy_customers)",
          defaultValue: 0,
          allowNull: false,
        },
        document_privacy_unit_id: {
          type: Sequelize.INTEGER,
          field: "document_privacy_unit_id",
          comment: "The unit that owns this document",
          references: { model: "customers_units", key: "customer_unit_id" },
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
    fn: "createTable",
    params: [
      "users",
      {
        user_id: {
          type: Sequelize.INTEGER,
          field: "user_id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_name: {
          type: Sequelize.STRING(50),
          field: "user_name",
          allowNull: true,
        },
        user_email: {
          type: Sequelize.STRING(400),
          field: "user_email",
          allowNull: true,
        },
        user_password: {
          type: Sequelize.STRING(200),
          field: "user_password",
          allowNull: true,
        },
        user_profile_type: {
          type: Sequelize.STRING(20),
          field: "user_profile_type",
          allowNull: false,
        },
        user_role: {
          type: Sequelize.STRING(20),
          field: "user_role",
          allowNull: false,
        },
        customer_id: {
          type: Sequelize.INTEGER,
          field: "customer_id",
          references: { model: "customers", key: "customer_id" },
          allowNull: true,
        },
        is_disabled: {
          type: Sequelize.STRING(20),
          field: "is_disabled",
          default: "0",
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
    fn: "addIndex",
    params: [
      "areas_aspects",
      ["area_id", "area_aspect_name"],
      {
        indexName: "uniq_area_name",
        name: "uniq_area_name",
        indicesType: "UNIQUE",
        type: "UNIQUE",
        transaction,
      },
    ],
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
    fn: "dropTable",
    params: ["actionplan_items", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["actionplans", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["areas", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["areas_aspects", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["audit_attachments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["audit_items", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["audits", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["ceps", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["cities", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["customers", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["customers_groups", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["customers_units", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["document_attachments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["document_items", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["document_scopes", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["document_status", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["documents", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["groups", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["groups_users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["items_areas_aspects", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["menus", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["menus_groups", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["responsibles_aspects", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["states", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["units_areas_aspects", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["units_aspects_responsibles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["units_contacts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
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
