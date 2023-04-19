var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;

var { userQuery, userMutation } = require('./user.schema');
var { motivationalTipQuery,  motivationalTipMutation } = require('./motivationTip.schema');
var { emergencyAlertQuery,  emergencyAlertMutation } = require('./emergencyAlert.schema');
var { vitalSignQuery,  vitalSignMutation } = require('./vitalSign.schema');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields:function() { return {
        ...userQuery,
        ...motivationalTipQuery,
        ...emergencyAlertQuery,
        ...vitalSignQuery        
    }}
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: function(){ return{
        ...userMutation,
        ...motivationalTipMutation,
        ...emergencyAlertMutation,
        ...vitalSignMutation    
    } }
});

module.exports = new GraphQLSchema({
    query: queryType,
    mutation: mutationType 
});