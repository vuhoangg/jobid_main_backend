import {GraphQLNonNull} from "graphql";
import {User, UserInput} from "../types";
import {markSpam, removeSpam, updateUser} from "../resolvers/update";

const userMutations = {
  userUpdate: {
    args: {input: {type: GraphQLNonNull(UserInput)}},
    resolve: (source, args, context, info) => updateUser(source, args, context, info),
    type: new GraphQLNonNull(User),
  },

  userMarkSpam: {
    args: {input: {type: GraphQLNonNull(UserInput)}},
    resolve: (source, args, context, info) => markSpam(source, args, context, info),
    type: new GraphQLNonNull(User),
  },
  userRemoveSpam: {
    args: {input: {type: GraphQLNonNull(UserInput)}},
    resolve: (source, args, context, info) => removeSpam(source, args, context, info),
    type: new GraphQLNonNull(User),
  }
};
export default userMutations;
