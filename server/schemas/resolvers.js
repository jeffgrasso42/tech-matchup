const { AuthenticationError } = require('apollo-server-express');
const { Matchup, Tech } = require('../models');

const resolvers = {
  Query: {
    matchups: async () => {
      const matchups = await Matchup.find({});
      return matchups;
    },

    matchup: async (parent, { matchupId }) => {
      const matchup = await Matchup.findOne({ _id: matchupId });
      return matchup;
    },

    techs: async () => {
      const techs = await Tech.find({});
      return techs;
    },
  },

  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);

      if (!matchup) {
        throw new AuthenticationError('Unable to create matchup');
      }
      return matchup;
    },

    createVote: async (parent, { techId, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id: techId },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );

      if (!vote) {
        throw new AuthenticationError('Unable to vote on matchup');
      }
      return vote;
    },
  },
};

module.exports = resolvers;
