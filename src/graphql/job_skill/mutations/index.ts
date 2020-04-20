import {GraphQLNonNull} from "graphql";
import {JobSkill, JobSkillInput} from "../types";
import {createJobSkill, updateJobSkill} from "../resolvers/update";

const jobSkillMutations = {
    jobSkillUpdate: {
        args: {input: {type: GraphQLNonNull(JobSkillInput)}},
        resolve: (source, args, context, info) => updateJobSkill(source, args, context, info),
        type: new GraphQLNonNull(JobSkill),
    },
    jobSkillCreate: {
        args: {input: {type: GraphQLNonNull(JobSkillInput)}},
        resolve: (source, args, context, info) => createJobSkill(source, args, context, info),
        type: new GraphQLNonNull(JobSkill),
    },
};
export default jobSkillMutations;