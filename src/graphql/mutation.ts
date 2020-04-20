import { GraphQLObjectType } from "graphql";
import userMutations from "./user/mutations";
import jobSkillMutations from "./job_skill/mutations";
import jobTitleMutations from "./job_title/mutations";
import benefitMutations from "./benefit/mutations";
import jobLevelMutations from "./job_level/mutations";
import jobLocationMutations from "./job_location/mutations";
import jobCategoryMutations from "./job_category/mutations";
import companyMutations from "./company/mutations";
import jobPreferLanguageMutations from "./job_prefer_language/mutations";
import suggestionMutations from "./suggestion/mutations";

const Mutation = new GraphQLObjectType({
    fields: {
        ...userMutations,
        ...jobSkillMutations,
        ...jobTitleMutations,
        ...benefitMutations,
        ...jobLevelMutations,
        ...jobLocationMutations,
        ...jobTitleMutations,
        ...jobSkillMutations,
        ...jobCategoryMutations,
        ...benefitMutations,
        ...companyMutations,
        ...jobPreferLanguageMutations,
        ...suggestionMutations,
    },
    name: "Mutation",
});
export default Mutation;