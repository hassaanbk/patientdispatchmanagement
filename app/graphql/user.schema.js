var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;

var mongoose = require("mongoose");
const userModel = require("../models/user.model");

const config = require("../../config/config");
const jwt = require("jsonwebtoken");
const jwtSecret = config.secretKey;
const jwsExpiry = config.jwtExpiry;
const bcrypt = require("bcrypt");

const userType = new GraphQLObjectType({
  name: "user",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      userCategory: {
        type: GraphQLString,
      },
      phoneNumber: {
        type: GraphQLString,
      },
      token: {
        type: GraphQLString,
      },
    };
  },
});

const queryType = {
  users: {
    type: new GraphQLList(userType),
    resolve: async () => {
      const users = await userModel.find({});
      if (!users) {
        throw new Error("users not found");
      }
      return users;
    },
  },

  user: {
    type: userType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      const user = await userModel.findById(args.id);
      if (!user) {
        throw new Error("user not found");
      }
      return user;
    },
  },
};

const mutationType = {
  createUser: {
    type: userType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      userRole: {
        type: new GraphQLNonNull(GraphQLString),
      },
      phoneNumber: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      const hashed = await bcrypt.hash(args.password, 10);
      const user = new userModel({
        email: args.email,
        password: hashed,
        firstName: args.firstName,
        lastName: args.lastName,
        userRole: args.userRole,
        phoneNumber: args.phoneNumber,
      });
      const newUser = await user.save();
      if (!newUser) {
        throw new Error("user not created");
      }
      return newUser;
    },
  },

  authenticate: {
    type: userType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      const user = await userModel.findOne({ email: args.email });
      if (!user) {
        throw new Error("user not found");
      }
      const isMatch = await bcrypt.compare(args.password, user.password);
      if (!isMatch) {
        throw new Error("password not matched");
      }
      const token = jwt.sign(
        { id: user._id, userRole: user.userRole, name: user.firstName },
        jwtSecret,
        { expiresIn: jwsExpiry }
      );
      user.token = token;
      return user;
    },
  },

  updateUser: {
    type: userType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      phoneNumber: {
        type: GraphQLString,
      },
    },
    resolve: async (parent, args) => {
      return await userModel.findByIdAndUpdate(
        args.id,
        {
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          phoneNumber: args.phoneNumber,
        },
        (err) => {
          if (err) {
            throw new Error("user not updated");
          }
        }
      );
    },
  },

  deleteUser: {
    type: userType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      return await userModel.findByIdAndRemove(args.id, (err) => {
        if (err) {
          throw new Error("user not deleted");
        }
      });
    },
  },
};

module.exports = {
  userQuery: queryType,
  userMutation: mutationType,
};
