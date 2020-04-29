import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getProfileView, getProfileViews} from "../resolvers/get";
import {ProfileView, ProfileViewArguments, ProfileViewConnection} from "../types";

const profileViewQueries = {
  profileView: {
    args: ProfileViewArguments,
    resolve: (source, args, context, info) => getProfileView(source, args, context, info),
    type: new GraphQLNonNull(ProfileView),
  },
  profileViews: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getProfileViews(source, args, context, info),
    type: new GraphQLNonNull(ProfileViewConnection),
  }
};
export default profileViewQueries;
