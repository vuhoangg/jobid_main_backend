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
import jobPostQueries from "./job_post/queries";
import activityQueries from "./activity/queries";
import jobSaveQueries from "./job_save/queries";
import jobApplyQueries from "./job_apply/queries";
import companyFollowQueries from "./company_follow/queries";
import jobAlertQueries from "./job_alert/queries";
import jobViewQueries from "./job_view/queries";
import profileViewQueries from "./profile_view/queries";
import notificationQueries from "./notification/queries";
import companyFeatureQueries from "./company_feature/queries";
import groupPermissionQueries from "./group_permission/queries";
import websiteRoleQueries from "./website_role/queries";
import logoutQueries from "./logout/queries";
import clientSubcriberQueries from "./client_subcriber/queries";
import serviceWorkerNotificationQueries from "./service_notification/queries";
import curriculumVitaeQueries from "./curriculum_vitae/queries";
import coordinateQueries from "./coordinate/queries";
import distanceBoundQueries from "./geo_code/queries";
import jobCommentQueries from "./job_comment/queries";
import jobReplyCommentQueries from "./job_comment_reply/queries";
import jobRatingQueries from "./job_rating/queries";
import cityQueries from "./city/queries";
import districtQueries from "./district/queries";
import wardQueries from "./ward/queries";
import facebookJobQueries from "./facebook_job/queries";
import companyRatingQueries from "./company_rating/queries";
import jobTypeQueries from "./job_type/queries";
import candidateQueries from "./candidate/queries";
import jobApplyOtherQueries from "./job_apply_other/queries";
import jobPostWithlistQueries from "./job_post_wishlist/queries";
import companyNotificationRegisterQueries from "./company_notification_register/queries";
import communityTagQueries from "./community_tag/queries";
import communityCategoryQueries from "./community_category/queries";
import communityPostQueries from "./community_post/queries";
import communityPostLikeQueries from "./community_post_like/queries";
import communityPostAnswerQueries from "./community_post_answer/queries";
import bannerQueries from "./banner/queries";
import jobRegisterQueries from "./job_register/queries";
import cvWarehouseQueries from "./cv_warehouse/queries";
import cvEmployerQueries from "./cv_employer/queries";
import jobPostReportQueries from "./job_post_report/queries";
import addressLatLngQueries from "./address_latlng/queries";
import jobKeywordQueries from "./job_keyword/queries";

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
    ...notificationQueries,
    ...companyFeatureQueries,
    ...groupPermissionQueries,
    ...websiteRoleQueries,
    ...logoutQueries,
    ...clientSubcriberQueries,
    ...serviceWorkerNotificationQueries,
    ...curriculumVitaeQueries,
    ...coordinateQueries,
    ...distanceBoundQueries,
    ...jobCommentQueries,
    ...jobReplyCommentQueries,
    ...jobRatingQueries,
    ...cityQueries,
    ...districtQueries,
    ...wardQueries,
    ...facebookJobQueries,
    ...companyRatingQueries,
    ...jobTypeQueries,
    ...candidateQueries,
    ...jobApplyOtherQueries,
    ...jobPostWithlistQueries,
    ...companyNotificationRegisterQueries,
    ...communityTagQueries,
    ...communityCategoryQueries,
    ...communityPostQueries,
    ...communityPostLikeQueries,
    ...communityPostAnswerQueries,
    ...bannerQueries,
    ...jobRegisterQueries,
    ...cvWarehouseQueries,
    ...cvEmployerQueries,
    ...jobPostReportQueries,
    ...addressLatLngQueries,
    ...jobKeywordQueries,
  },
  name: "QueryRoot",
});
export default QueryRoot;
