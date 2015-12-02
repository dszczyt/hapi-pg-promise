'use strict';

const Hoek = require('hoek');
const pg_promise = require('pg-promise');


const DEFAULTS = {
    init: {

    },
    config: {
        cn: undefined
    }
    /*config: {
        connectionString: undefined,
        //native: false,
        attach: 'onPreHandler',
        detach: 'tail'
    }*/
};


exports.register = function (server, options, next) {

    const init = Hoek.applyToDefaults(DEFAULTS.init, options.init);
    const config = Hoek.applyToDefaults(DEFAULTS.config, options.config);

    const pgp = pg_promise(init);

    /*if (config.native) {
        Pg = require('pg').native;
    }*/

    let db; // shared connection object
    let sco;

    server.on('start', function(server, next) {

        console.log('server start');
        server.db = pgp(config.cn).connect();
        server.db.then(function(obj) { sco = sco; });
        next();
    });

    server.ext('onPreHandler', function(request, reply) {

        console.log('request');
        request.server.db.then(() => {

            request.sco = sco;
            reply.continue();
        }).catch((err) => reply(err));
    });

    /*server.on('tail', function(request, err) {

        console.log('tail');
        sco.done();
    });*/

    /*, (err, client, done) => {

            if (err) {
                reply(err);
                return;
            }

            request.pgp = {
                client: client,
                done: done,
                kill: false
            };

            reply.continue();
        });
    });*/


    server.on('stop', (server, err) => {

        /*if (request.pgp) {
            request.pgp.end();
            //request.pgp.done(request.pg.kill);
        }*/
    });


    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
