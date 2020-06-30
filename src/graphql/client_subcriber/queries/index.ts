import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getClientSubcriber, getClientSubcribers} from "../resolvers/get";
import {ClientSubcriber, ClientSubcriberArguments, ClientSubcriberConnection} from "../types";

const clientSubcriberQueries = {
    clientSubcriber: {
        args: ClientSubcriberArguments,
        resolve: (source, args, context, info) => getClientSubcriber(source, args, context, info),
        type: new GraphQLNonNull(ClientSubcriber),
    },
    clientSubcribers: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getClientSubcribers(source, args, context, info),
        type: new GraphQLNonNull(ClientSubcriberConnection),
    }
};
export default clientSubcriberQueries;