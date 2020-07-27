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
import jobPostMutations from "./job_post/mutations";
import jobSaveMutations from "./job_save/mutations";
import jobApplyMutations from "./job_apply/mutations";
import companyFollowMutations from "./company_follow/mutations";
import jobAlertMutations from "./job_alert/mutations";
import jobViewMutations from "./job_view/mutations";
import profileViewMutations from "./profile_view/mutations";
import notificationMutations from "./notification/mutations";
import companyFeatureMutations from "./company_feature/mutations";
import groupPermissionMutations from "./group_permission/mutations";
import clientSubcriberMutations from "./client_subcriber/mutations";
import serviceWorkerNotificationMutations from "./service_notification/mutations";
import curriculumVitaeMutations from "./curriculum_vitae/mutations";
import jobCommentMutations from "./job_comment/mutations";
import jobReplyCommentMutations from "./job_comment_reply/mutations";
import jobRatingMutations from "./job_rating/mutations";
import cityMutations from "./city/mutations";
import districtMutations from "./district/mutations";
import wardMutations from "./ward/mutations";
import facebookJobMutations from "./facebook_job/mutations";


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
    ...jobPostMutations,
    ...jobSaveMutations,
    ...jobApplyMutations,
    ...companyFollowMutations,
    ...jobAlertMutations,
    ...jobViewMutations,
    ...profileViewMutations,
    ...notificationMutations,
    ...companyFeatureMutations,
    ...groupPermissionMutations,
    ...clientSubcriberMutations,
    ...serviceWorkerNotificationMutations,
    ...curriculumVitaeMutations,
    ...jobCommentMutations,
    ...jobReplyCommentMutations,
    ...jobRatingMutations,
    ...cityMutations,
    ...districtMutations,
    ...wardMutations,
    ...facebookJobMutations,
  },
  name: "Mutation",
});
export default Mutation;
