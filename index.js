'use strict';

const Hoek = require('hoek');
const PgPromise = require('pg-promise');
const pkg = require('./package.json');

const DEFAULTS = {
    init: {},
    cn: undefined
};

exports.register = {
    pkg,
    register(server, options) {

        const opts = Hoek.applyToDefaults(DEFAULTS, options);

        const pgp = PgPromise(opts.init);
        const db = pgp(opts.cn);

        server.ext('onPreHandler', (request, h) => {

            request.db = db;
            return h.continue;
        });

        server.expose('db', db);

        server.on('stop', pgp.end);
    }
};
