import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobSkill, getJobSkills} from "../resolvers/get";
import {JobSkill, JobSkillArguments, JobSkillConnection} from "../types";

const jobSkillQueries = {
    jobSkill: {
        args: JobSkillArguments,
        resolve: (source, args, context, info) => getJobSkill(source, args, context, info),
        type: new GraphQLNonNull(JobSkill),
    },
    jobSkills: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobSkills(source, args, context, info),
        type: new GraphQLNonNull(JobSkillConnection),
    }
};
export default jobSkillQueries;