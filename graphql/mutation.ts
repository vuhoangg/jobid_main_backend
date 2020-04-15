import { GraphQLObjectType } from "graphql";
import userMutations from "./user/mutations";
import jobSkillMutations from "./job_skill/mutations";
import jobTitleMutations from "./job_title/mutations";
import benefitMutations from "./benefit/mutations";
import jobLevelMutations from "./benefit/mutations";

const Mutation = new GraphQLObjectType({
    fields: {
        ...userMutations,
        ...jobSkillMutations,
        ...jobTitleMutations,
        ...benefitMutations,
        ...jobLevelMutations,
    },
    name: "Mutation",
});
export default Mutation;