var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
const mongoose = require("mongoose");

var motivationalTipModel = require("../models/motivationalTip.model");

const motivationalTipType = new GraphQLObjectType({
    name: "motivationalTip",
    fields: () => ({
        _id: {
            type: GraphQLString,
        },
        message: {
            type: GraphQLString
        }
    })
});

const queryType = {
    MotivationalTips: {
        type: new GraphQLList(motivationalTipType),
        resolve: function () {
            const MotivationalTips = motivationalTipModel.find().sort({_id:-1}).limit(5).exec();
            if (!MotivationalTips) {
                throw new Error("MotivationalTips not found");
            }
            return MotivationalTips;
        },
    }
};

const mutationType = {
    createMotivationalTip: {
        type: motivationalTipType,
        args: {
            message: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: function (root, params) {
            const MotivationalTipModel = new motivationalTipModel(params);

            const newMotivationalTip = MotivationalTipModel.save();
            if (!newMotivationalTip) {
                throw new Error("Could not enter the motivational Tip details!");
            }
            return newMotivationalTip;
        },
    }
};

module.exports = {
    motivationalTipQuery: queryType,
    motivationalTipMutation: mutationType,
};
