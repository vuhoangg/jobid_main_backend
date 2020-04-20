import {GraphQLNonNull} from "graphql";
import {JobPreferLanguage, JobPreferLanguageInput} from "../types";
import {createJobPreferLanguage, updateJobPreferLanguage} from "../resolvers/update";

const jobPreferLanguageMutations = {
    jobPreferLanguageUpdate: {
        args: {input: {type: GraphQLNonNull(JobPreferLanguageInput)}},
        resolve: (source, args, context, info) => updateJobPreferLanguage(source, args, context, info),
        type: new GraphQLNonNull(JobPreferLanguage),
    },
    jobPreferLanguageCreate: {
        args: {input: {type: GraphQLNonNull(JobPreferLanguageInput)}},
        resolve: (source, args, context, info) => createJobPreferLanguage(source, args, context, info),
        type: new GraphQLNonNull(JobPreferLanguage),
    },
};
export default jobPreferLanguageMutations;