import {GraphQLObjectType} from "graphql";
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
import jobPostQueries from "./job_post/queries";
import activityQueries from "./activity/queries";
import jobSaveQueries from "./job_save/queries";
import jobApplyQueries from "./job_apply/queries";
import companyFollowQueries from "./company_follow/queries";
import jobAlertQueries from "./job_alert/queries";
import jobViewQueries from "./job_view/queries";
import profileViewQueries from "./profile_view/queries";

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
    ...jobPostQueries,
    ...activityQueries,
    ...jobSaveQueries,
    ...jobApplyQueries,
    ...companyFollowQueries,
    ...jobAlertQueries,
    ...jobViewQueries,
    ...profileViewQueries,
  },
  name: "QueryRoot",
});
export default QueryRoot;
