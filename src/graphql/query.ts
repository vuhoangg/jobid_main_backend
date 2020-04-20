import { GraphQLObjectType } from "graphql";
import userQueries from "./user/queries";
import jobSkillQueries from "./job_skill/queries";
import jobTitleQueries from "./job_title/queries";
import benefitQueries from "./benefit/queries";
import jobLevelQueries from "./job_level/queries";
import jobLocationQueries from "./job_location/queries";
import jobCategoryQueries from "./job_category/queries";
import companyQueries from "./company/queries";
import jobPreferLanguageQueries from "./job_prefer_language/queries";
import suggestionQueries from "./suggestion/queries";

const QueryRoot = new GraphQLObjectType({
    fields: {
        ...userQueries,
        ...jobSkillQueries,
        ...jobTitleQueries,
        ...benefitQueries,
        ...jobLevelQueries,
        ...jobLocationQueries,
        ...jobTitleQueries,
        ...jobSkillQueries,
        ...jobCategoryQueries,
        ...benefitQueries,
        ...companyQueries,
        ...jobPreferLanguageQueries,
        ...suggestionQueries,
    },
    name: "QueryRoot",
});
export default QueryRoot;