
const express = require('express')
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
        "http://localhost:5000",  //Local
        "http://localhost:3000",] //Admin
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

    app.use(express.static(path.join(__dirname, 'client/dist')));

    app.get('/*', function (req, res) {
       res.sendFile(path.join(__dirname, 'client/dist/racoins', 'index.html'));
    });

    const port = process.env.PORT || 5000;
    await new Promise(resolve => {
        httpServer.listen({port}, resolve)
    });
    console.log(`Server listening to port ${port}`);
    console.log(`connected to ${process.env.DATABASE_URL}`);
}

startApolloServer(typeDefs, resolvers);