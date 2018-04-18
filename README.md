# hapi-pg-promise

Wrap requests with a Postgres connection using promises.

[![Build Status](https://travis-ci.org/dszczyt/hapi-pg-promise.svg?branch=master)](https://travis-ci.org/dszczyt/hapi-pg-promise)
[![Dependency Status](https://david-dm.org/dszczyt/hapi-pg-promise.svg?style=flat)](https://david-dm.org/dszczyt/hapi-pg-promise)
[![devDependency Status](https://david-dm.org/dszczyt/hapi-pg-promise/dev-status.svg?style=flat)](https://david-dm.org/dszczyt/hapi-pg-promise#info=devDependencies)
[![peerDependency Status](https://david-dm.org/dszczyt/hapi-pg-promise/peer-status.svg?style=flat)](https://david-dm.org/dszczyt/hapi-pg-promise#info=peerDependencies)

We use the [`pg-promise`](https://github.com/vitaly-t/pg-promise) (`pg-promise`)


## Install

```bash
$ npm install hapi-pg-promise
```

## Usage

In your request handlers you'll have access to `request.db` which you
can use to make DB requests.

`server.plugins['hapi-pg-promise'].db` is available outside of request
handlers.

### Hapi 17

Current version works with Hapi 17.x.x. For older versions use 1.0.0 of hapi-pg-promise.

#### Register the plugin

```js
const hapiPgPromise = require('hapi-pg-promise');
const plugin = {
    plugin: hapiPgPromise,
    options: {
        cn: 'postgres://username:password@host:port/database',
        settings: {
          // pg-promise options
        }
    }
};

server.register(plugin);
```

## License

MIT
