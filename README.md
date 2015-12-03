# hapi-node-postgres

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

#### Register the plugin manually.

```js
const plugin = {
    register: require('hapi-pg-promise'),
    options: {
        cn: 'postgres://username:password@localhost/database',
        settings: {
          // pg-promise options
        }
    }
};

server.register(plugin, (err) => {

    if (err) {
        console.error('Failed loading "hapi-pg-promise" plugin');
    }
 });
```

#### Or include it in your composer manifest.

```json
"plugins": {
    "hapi-pg-promise": {
        "cn": "postgres://username:password@localhost/database",
        "settings": {
          ...
        }
    }
}
```

## License

MIT
