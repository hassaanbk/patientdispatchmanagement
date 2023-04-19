process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require("./config/mongoose"),
    express = require("./config/express");
    
var db = mongoose();
const { graphqlHTTP } = require("express-graphql");
var cors = require("cors");
var schema = require("./app/graphql/schema");

var app = express();

app.use(cors());

app.use(
    "/hospital/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
        //rootValue: global
    }));

app.listen(5000);

module.exports = app;

console.log('Server running at http://localhost:5000/');