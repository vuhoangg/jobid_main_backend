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
import companyRatingMutations from "./company_rating/mutations";
import jobTypeMutations from "./job_type/mutations";
import candidateMutations from "./candidate/mutations";
import jobApplyOtherMutations from "./job_apply_other/mutations";
import jobPostWishlistMutations from "./job_post_wishlist/mutations";
import companyNotificationRegisterMutations from "./company_notification_register/mutations";
import communityTagMutations from "./community_tag/mutations";
import communityCategoryMutations from "./community_category/mutations";
import communityPostMutations from "./community_post/mutations";
import communityPostLikeMutations from "./community_post_like/mutations";
import communityPostAnswerMutations from "./community_post_answer/mutations";
import bannerMutations from "./banner/mutations";
import jobRegisterMutations from "./job_register/mutations";
import cvWarehouseMutations from "./cv_warehouse/mutations";
import cvEmployerMutations from "./cv_employer/mutations";
import jobPostReportMutations from "./job_post_report/mutations";
import jobKeywordMutations from "./job_keyword/mutations";

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
    ...companyRatingMutations,
    ...jobTypeMutations,
    ...candidateMutations,
    ...jobApplyOtherMutations,
    ...jobPostWishlistMutations,
    ...companyNotificationRegisterMutations,
    ...communityTagMutations,
    ...communityCategoryMutations,
    ...communityPostMutations,
    ...communityPostLikeMutations,
    ...communityPostAnswerMutations,
    ...bannerMutations,
    ...jobRegisterMutations,
    ...cvWarehouseMutations,
    ...cvEmployerMutations,
    ...jobPostReportMutations,
    ...jobKeywordMutations,
  },
  name: "Mutation",
});
export default Mutation;
