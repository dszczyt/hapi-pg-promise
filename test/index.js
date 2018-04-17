'use strict';

const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');

let connect = function () {

    return new Promise((resolve) => {

        resolve();
    });
};

const Plugin = {
    name: 'pg-promise',
    register(server, options) {

        return function () {

            return {
                connect
            };
        };
    }
};
const lab = exports.lab = Lab.script();
const request = {
    method: 'GET',
    url: '/'
};
let server;

lab.beforeEach(() => {

    server = Hapi.Server({ port: 0 });
    server.route({
        method: 'GET',
        path: '/',
        handler: function (req) {

            return 'hapi-pg-promise, at your service';
        }
    });
});


lab.experiment('Postgres Plugin', () => {

    lab.test('it registers the plugin', async () => {

        try {

            await server.register(Plugin);
            await server.start();
        }
        catch (err) {

            Code.fail(err);
        }
    });


    lab.test('it successfully returns when the connection succeeds in extension point', async () => {

        const realConnect = connect;
        connect = function () {

            return new Promise((resolve, reject) => {

                resolve();
            });
        };

        try {

            await server.register(Plugin);
            const response = await server.inject(request);
            Code.expect(response.statusCode).to.equal(200);
            connect = realConnect;
        }
        catch (err) {

            Code.fail(err);
        }
    });

    lab.test('it successfully uses native bindings without error', async () => {

        const pluginWithConfig = {
            options: {
                connectionString: 'postgres://postgres:mysecretpassword@localhost/hapi_node_postgres',
                native: true
            },
            ...Plugin
        };
        
        try {

            await server.register(pluginWithConfig);
            const response = await server.inject(request);
            Code.expect(response.statusCode).to.equal(200);
        }
        catch (err) {

            Code.fail(err);
        }
    });
});
