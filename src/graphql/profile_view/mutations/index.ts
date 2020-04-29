import {GraphQLNonNull} from "graphql";
import {ProfileView, ProfileViewInput} from "../types";
import {updateProfileView} from "../resolvers/update";

const profileViewMutations = {
  profileViewUpdate: {
    args: {input: {type: GraphQLNonNull(ProfileViewInput)}},
    resolve: (source, args, context, info) => updateProfileView(source, args, context, info),
    type: new GraphQLNonNull(ProfileView),
  },
};
export default profileViewMutations;
