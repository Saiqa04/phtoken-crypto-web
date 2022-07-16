const express = require('express')
const helmet = require('helmet');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const fs = require('fs');
const http = require('http');
const resolvers = require('./API/src/GraphQL/resolvers');
const typeDefs = gql(fs.readFileSync('./API/src/GraphQL/typeDefs.graphql', { encoding: 'utf-8' }));
const GetClientIP = require("./API/src/utils/request-ip")
const db = require ('./API/models/index');

const app = express();
const httpServer = http.createServer(app);

const corsOptions = {
    origin: [
        "https://racoins.cc", //Main
        "http://192.168.254.127:3001", //Lan
        "http://localhost:5000",
        "https://studio.apollographql.com",  //Local
        "http://localhost:5001",
        "http://localhost:3001"] //Admin
};

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded",
        formatError: (err) => {
            if(process.env.NODE_ENV === 'production'){
                if (err.message.startsWith('Database Error'))
                    return new Error('Internal server error');
             
                if (err.message.startsWith('Variable'))
                    return new Error('Bad request');

                return err;
            }

            return err;
          },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: context => ({
            ...context,
            clientIP: GetClientIP(context.req)
        })
    });
    
    

    await server.start();
    server.applyMiddleware({ 
        app,
        path: '/api',
        cors: corsOptions
     });
    
    app.use(helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "default-src": ["'self'"],
            "script-src": [
                "'self'",
                "'unsafe-inline'",
                "https:",
                "https://*.google.com",
                "https://*.googleapis.com",
                "https://*.google-analytics.com",
                "https://*.googletagmanager.com",
                "https://*.fontawesome.com",
                "https://*.coinbrain.com",
                "https://*.twitter.com",
                "https://racoins.cc"
            ],
            "connect-src": [
                "'self'",
                "'unsafe-inline'",
                "https://*.google.com",
                "https://*.googleapis.com",
                "https://*.google-analytics.com",
                "https://*.googletagmanager.com",
                "https://*.fontawesome.com",
                "https://*.coinbrain.com",
                "https://racoins.cc"
            ],
            "frame-src" : [
                "https://*.twitter.com",
                "https://coinbrain.com",
            ],
            "img-src": [
                "'self'",
                'data:',
                "https:"
            ]
        }
    }));
    const indexPath = path.resolve(__dirname, './CLIENT/dist', 'index.html');

    app.get('/', function (req, res) {
       fs.readFile(indexPath, 'utf-8', (err, data) => {
            if(err){
                console.error('Error during file reading', err);
                return res.status(404).end();
            }

            data = data.replace(/\$TITLE/g, "Racoins.cc - Listing & Coin voting platform")
            .replace(/\$DESCRIPTION/g, "Finding new crypto gems made easy with Racoins.cc")
            .replace(/\$IMAGE/g, "https://racoins.cc/images/logo-racoins-313.png")

            return res.send(data);
       })
    });

    app.get('/terms-and-conditions', function (req, res) {
        fs.readFile(indexPath, 'utf-8', (err, data) => {
             if(err){
                 console.error('Error during file reading', err);
                 return res.status(404).end();
             }
 
             data = data.replace(/\$TITLE/g, "Terms & Conditions - Racoins.cc")
             .replace(/\$DESCRIPTION/g, "Finding new crypto gems made easy with Racoins.cc")
             .replace(/\$IMAGE/g, "https://racoins.cc/images/logo-racoins-313.png")
 
             return res.send(data);
        })
    });

    app.get('/privacy-policy', function (req, res) {
        fs.readFile(indexPath, 'utf-8', (err, data) => {
             if(err){
                 console.error('Error during file reading', err);
                 return res.status(404).end();
             }
 
             data = data.replace(/\$TITLE/g, "Privacy Policy - Racoins.cc")
             .replace(/\$DESCRIPTION/g, "Finding new crypto gems made easy with Racoins.cc")
             .replace(/\$IMAGE/g, "https://racoins.cc/images/logo-racoins-313.png")
 
             return res.send(data);
        })
    });

    app.get('/booking', function (req, res) {
        fs.readFile(indexPath, 'utf-8', (err, data) => {
             if(err){
                 console.error('Error during file reading', err);
                 return res.status(404).end();
             }
 
             data = data.replace(/\$TITLE/g, "Promote your coin - Racoins.cc")
             .replace(/\$DESCRIPTION/g, "Finding new crypto gems made easy with Racoins.cc")
             .replace(/\$IMAGE/g, "https://racoins.cc/images/logo-racoins-313.png")
 
             return res.send(data);
        })
    });

    app.get('/add-coin', function (req, res) {
        fs.readFile(indexPath, 'utf-8', (err, data) => {
             if(err){
                 console.error('Error during file reading', err);
                 return res.status(404).end();
             }
 
             data = data.replace(/\$TITLE/g, "Submit your coin - Racoins.cc")
             .replace(/\$DESCRIPTION/g, "Finding new crypto gems made easy with Racoins.cc")
             .replace(/\$IMAGE/g, "https://racoins.cc/images/logo-racoins-313.png")
 
             return res.send(data);
        })
    });

    app.get('/coin/:id', function (req, res) {
        
        fs.readFile(indexPath, 'utf-8', (err, data) => {
            if(err){
                console.error('Error during file reading', err);
                return res.status(404).end();
            }

            data = data.replace(/\$TITLE/g, `${req.params.id} | Racoins.cc`)
            .replace(/\$DESCRIPTION/g, `Click to view $${req.params.id} on Racoins.cc`)
            .replace(/\$IMAGE/g, "https://racoins.cc/images/logo-racoins-313.png")

            return res.send(data);
       })

        console.log(req.params);
    });

    app.use(express.static(path.resolve(__dirname, './CLIENT/dist')));

    app.get('*', function (req, res) {
        fs.readFile(indexPath, 'utf-8', (err, data) => {
            if(err){
                console.error('Error during file reading', err);
                return res.status(404).end();
            }

            data = data.replace(/\$TITLE/g, "Racoins.cc - Listing & Coin voting platform")
            .replace(/\$DESCRIPTION/g, "Finding new crypto gems made easy with Racoins.cc")
            .replace(/\$IMAGE/g, "https://racoins.cc/images/logo-racoins-313.png")

            return res.send(data);
       })
    });
    
    
    const port = process.env.PORT || 5000;
    await new Promise(resolve => {
        httpServer.listen({port}, resolve)
    });
    console.log(`Server listening to port ${port}`);
    console.log(`connected to ${process.env.DATABASE_URL}`);
  
}

startApolloServer(typeDefs, resolvers);