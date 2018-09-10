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
  db.createTable( 'hash_2_params',
  {
    id:
    {
      type: 'string',
      notNull: true,
      primaryKey: true,
      length: 32
    },
    hash:
    {
      type: 'string',
      length: 128,
      notNull: true,
      unique:true
    },
    time_to_live:
    {
      type: 'string',
      length: 11,
      notNull: true,
    },
    data:
    {
      type: 'text',
      length: 256,
      notNull: false,
    },
    expired:
    {
      type: 'boolean',
      notNull: true,
    },
    expire_after_first_access:
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
  db.dropTable('hash_2_params', callback);
};

exports._meta = {
  "version": 1
};
