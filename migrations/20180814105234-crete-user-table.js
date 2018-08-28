'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {

  //automatic mapping, the mapping key resolves to the column
  db.createTable( 'users',
  {
    id:
    {
      type: 'string',
      notNull: true,
      primaryKey: true,
      length: 32
    },
    user_name:
    {
      type: 'string',
      length: 128,
      notNull: true,
      unique:true
    },
    password:
    {
      type: 'string',
      length: 128,
      notNull: true,
    },
    first_name:
    {
      type: 'string',
      length: 128,
      notNull: false,
    },
    last_name:
    {
      type: 'string',
      length: 128,
      notNull: false,
    },
    url_image:
    {
      type: 'string',
      length: 128,
      notNull: false,
    },
    date_of_birth:
    {
      type: 'date',
      notNull: false,
    },
    gender:
    {
      type: 'string',
      length: 16,
      notNull: false,
    },
    phone:
    {
      type: 'string',
      length: 128,
      notNull: false,
    },
    role:
    {
      type: 'int',
      length: 1,
      notNull: true,
    },
    city:
    {
      type: 'string',
      length: 64,
      notNull: false,
    },
    country:
    {
      type: 'string',
      length: 64,
      notNull: false,
    },
    is_active:
    {
      type: 'boolean',
      notNull: true,
    },
    created:
    {
      type: 'datetime',
      notNull: true,
    },
    updated:
    {
      type: 'datetime',
      notNull: false,
    },
  }, callback );
};

exports.down = function (db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  "version": 1
};
