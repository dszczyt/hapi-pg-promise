'use strict';

const Hoek = require('hoek');
const pg_promise = require('pg-promise');


const DEFAULTS = {
    init: {

    },
    cn: undefined
    /*config: {
        connectionString: undefined,
        //native: false,
        attach: 'onPreHandler',
        detach: 'tail'
    }*/
};


exports.register = function (server, options, next) {

    const opts = Hoek.applyToDefaults(DEFAULTS, options);
    //const config = Hoek.applyToDefaults(DEFAULTS.config, options.config);

    const pgp = pg_promise(opts.init);
    const db = pgp(opts.cn);

    /*if (config.native) {
        Pg = require('pg').native;
    }*/

    //let db; // shared connection object
    //let sco;

    /*server.on('start', () => {

        console.log('server start');
        server['db'] = pgp(opts.config.cn);
        //server['db'].then(function(obj) { sco = sco; });
        //next();
    });*/

    server.ext('onPreHandler', (request, reply) => {

        //console.log('request', request.server['db']);
        request.db = db;
        reply.continue();
    });

    server.on('stop', () => {

        // console.log('tail');
        //request['db'].
        pgp.end();
    });

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


    // server.on('stop', (server, err) => {

        /*if (request.pgp) {
            request.pgp.end();
            //request.pgp.done(request.pg.kill);
        }*/
    // });


    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
