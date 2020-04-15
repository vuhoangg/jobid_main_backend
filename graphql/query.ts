import { GraphQLObjectType } from "graphql";
import userQueries from "./user/queries";
import jobSkillQueries from "./job_skill/queries";
import jobTitleQueries from "./job_title/queries";
import benefitQueries from "./benefit/queries";
import jobLevelQueries from "./benefit/queries";

const QueryRoot = new GraphQLObjectType({
    fields: {
        ...userQueries,
        ...jobSkillQueries,
        ...jobTitleQueries,
        ...benefitQueries,
        ...jobLevelQueries,
    },
    name: "QueryRoot",
});
export default QueryRoot;