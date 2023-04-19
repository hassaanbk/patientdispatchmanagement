var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;

const mongoose = require("mongoose");
var vitalSignModel = require("../models/vitalSign.model");

const vitalSignType = new GraphQLObjectType({
    name: "vitalSign",
    fields: () => ({
        _id: {
            type: GraphQLString,
        },
        bodyTemperature: {
            type: GraphQLString,
        },
        heartRate: {
            type: GraphQLString,
        },
        bloodPressure: {
            type: GraphQLString,
        },
        respiratoryRate: {
            type: GraphQLString,
        },
        weight: {
            type: GraphQLString,
        },
        patient: {
            type: GraphQLString,
        }
    })
});

const queryType = {
    vitalSigns: {
        type: new GraphQLList(vitalSignType),
        resolve: () => {
            const vitalSigns = vitalSignModel.find({});
            if (!vitalSigns) {
                throw new Error("Error");
            }
            return vitalSigns;
        }
    },
    vitalSign: {
        type: new GraphQLList(vitalSignType),
        args: {
            patient: {
                type: new GraphQLNonNull(GraphQLString)
            },
        },
        resolve: (root, args) => {
            const vitalSign = vitalSignModel.find({patient: args.patient});
            if (!vitalSign) {
                throw new Error("Error");
            }
            return vitalSign;
        }
    }
};

const mutationType = {
    addVitalSign: {
        type: vitalSignType,
        args: {
            bodyTemperature: {
                type: new GraphQLNonNull(GraphQLString)
            },
            heartRate: {
                type: GraphQLString,
            },
            bloodPressure: {
                type: GraphQLString
            },
            respiratoryRate: {
                type: GraphQLString
            },
            weight: {
                type: GraphQLString
            },
            patient: {
                type: GraphQLString
            }
        },
        resolve: (root, args) => {
            const vitalSign = new vitalSignModel({
                bodyTemperature: args.bodyTemperature,
                heartRate: args.heartRate,
                bloodPressure: args.bloodPressure,
                respiratoryRate: args.respiratoryRate,
                weight: args.weight,
                patient: args.patient
            });
            if(!vitalSign) {
                throw new Error("Could not enter the VitalSign details!");
            }
            return vitalSign.save();
        }
    }
};

module.exports = {
    vitalSignQuery: queryType,
    vitalSignMutation: mutationType  
};