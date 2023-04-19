var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;

const mongoose = require('mongoose');

var UserModel = require('../models/user.model');
var emergencyAlertModel = mongoose.model('EmergencyAlert');

const emergencyAlertType = new GraphQLObjectType({
    name: 'emergencyAlert',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        alert: {
            type: new GraphQLNonNull(GraphQLString)
        },
        patient: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

const queryType = {
    emergencyAlerts: {
        type: new GraphQLList(emergencyAlertType),
        resolve: () => {
            const emergencyAlerts = emergencyAlertModel.find().sort({_id:-1}).limit(5).exec();
            if (!emergencyAlerts) {
                throw new Error('Alert not found');
            }
            return emergencyAlerts;
        }
    },
    emergencyAlert: {
        type: new GraphQLList(emergencyAlertType),
        args: {
            patient: {
                type: new GraphQLNonNull(GraphQLString)
            },
        },
        resolve: (root, args) => {
            const emergencyAlerts = emergencyAlertModel.find({patient: args.patient}).sort({_id:-1}).limit(1).exec();
            if (!emergencyAlerts) {
                throw new Error('Alert not found for patient');
            }
            return emergencyAlerts;
        }
    }
};

const mutationType = {
    createEmergencyAlert: {
        type: emergencyAlertType,
        args: {
            alert: {
                type: new GraphQLNonNull(GraphQLString)
            },
            patient: {
                type: GraphQLString
            }
        },
        resolve: (root, args) => {
            const emergencyAlert = new emergencyAlertModel({
                alert: args.alert,
                patient: args.patient
            });
            return emergencyAlert.save();
        }
    }
};


module.exports = {
    emergencyAlertQuery: queryType,
    emergencyAlertMutation: mutationType
}