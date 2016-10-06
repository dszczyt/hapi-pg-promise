'use strict';

const Hoek = require('hoek');
const PgPromise = require('pg-promise');

const DEFAULTS = {
    init: {},
    cn: undefined
};

exports.register = (server, options, next) => {

    const opts = Hoek.applyToDefaults(DEFAULTS, options);

    const pgp = PgPromise(opts.init);
    const db = pgp(opts.cn);

    server.ext('onPreHandler', (request, reply) => {

        request.db = db;
        reply.continue();
    });

    server.on('stop', () => {

        pgp.end();
    });

    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
