const fs = require('fs');

exports.registrationRoutes = app => {
    const routeFiles = fs
        .readdirSync(__dirname)
        .filter(x => x !== 'index.js')
        .map(x => `${__dirname}\\${x}`);

    routeFiles.forEach(x => require(x)(app))
};
