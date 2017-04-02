'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');


const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({
    port: 3000
});


server.register([Blipp, Inert, Vision], () => {});

server.views({
    engines: {
        html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
    //helpersPath: 'views/helpers',
    //partialsPath: 'views/partials'
});


server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: {
            template: 'index'
        }
    }
});

server.route({

    method: 'POST',
    path: '/imageUpload',
    handler: function (request, reply) {
//        var formresponse = JSON.stringify(request.payload);
//        var parsing = JSON.parse(formresponse);
        console.log(request.payload["file"]);
        reply.view('imageuploaded', {});
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);

});
