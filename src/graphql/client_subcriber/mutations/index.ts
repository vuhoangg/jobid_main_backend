import {GraphQLNonNull} from "graphql";
import {ClientSubcriber, ClientSubcriberInput} from "../types";
import {createClientSubcriber, updateClientSubcriber} from "../resolvers/update";

const clientSubcriberMutations = {
    clientSubcriberUpdate: {
        args: {input: {type: GraphQLNonNull(ClientSubcriberInput)}},
        resolve: (source, args, context, info) => updateClientSubcriber(source, args, context, info),
        type: new GraphQLNonNull(ClientSubcriber),
    },
    clientSubcriberCreate: {
        args: {input: {type: GraphQLNonNull(ClientSubcriberInput)}},
        resolve: (source, args, context, info) => createClientSubcriber(source, args, context, info),
        type: new GraphQLNonNull(ClientSubcriber),
    },
};
export default clientSubcriberMutations;