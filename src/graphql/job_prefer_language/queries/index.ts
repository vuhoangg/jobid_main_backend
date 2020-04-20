import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobPreferLanguage, getJobPreferLanguages} from "../resolvers/get";
import {JobPreferLanguage, JobPreferLanguageArguments, JobPreferLanguageConnection} from "../types";

const jobPreferLanguageQueries = {
    jobPreferLanguage: {
        args: JobPreferLanguageArguments,
        resolve: (source, args, context, info) => getJobPreferLanguage(source, args, context, info),
        type: new GraphQLNonNull(JobPreferLanguage),
    },
    jobPreferLanguages: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobPreferLanguages(source, args, context, info),
        type: new GraphQLNonNull(JobPreferLanguageConnection),
    }
};
export default jobPreferLanguageQueries;