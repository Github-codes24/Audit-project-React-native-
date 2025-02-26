import { AboutUs } from "../../assets/images/svg";

export const apiEndPoints = {
  //auth API endpoint
  registerApi: 'api/user/register',
  loginApi: 'api/user/login',
  forgotPasswordApi: 'api/user/forgotPassword',
  verifyOtp: 'api/user/verifyOtp',
  resetPasswordApi: 'api/user/resetPassword',
  OtpForRegisteration:'api/user/verifyOtpForRegistration',
  deleteAccount:'api/user/deleteUser',
  getUser:'api/user/getUserById',
  resendCodeForRegistration:'api/user/resendCodeForRegistration',
  resendCodeforForgotPassword:'api/user/resendCode',
  
//complaince API endpoint

getCompilanceQuestionsCategory:'api/complianceCategory/getAllComplianceCategoryNames',
getcompilanceQuestions:'api/complianceQuestions/getQuestions',
calculateCompilanceScore:'api/complianceQuestions/calculateScore',

//Eligibility API endpoint
getEligibilityCategory:'api/eligibilityCategory/getAllEligibilityCategoryNames',
getEligibilityQuestions:'api/eligibilityQuestions/getQuestions',
getEligibilityScore:'api/eligibilityQuestions/calculateEligibility',


//profile api endpoint
getPrivacyPolicy:'api/privacyPolicy/getPrivacyPolicy',
getTermAndDondition:'api/termsAndConditions/getTermsAndConditions',
aboutUSGetApi:'api/aboutUs/getAboutUs',
updateUserApi:'api/user/updateUser',


//blogs api endpoint
getAllBlogs:'api/blogRoutes/getAllBlogs',
getBlogById:'api/blogRoutes/getBlogById',



//customer support api slice
contactUs:'api/contactUs/createContactUs',
aboutUs:'api/aboutUs/getAboutUs',
getContactUs:'api/contactUs/getAdminContactUs',

//Notification support api Slice

get10UserNotificationsApi:'api/user/get10UserNotifications',
getAllNotificationsApi:'api/user/getAllUserNotifications',
markNotificationAsRead:'api/user/markNotificationAsReadOfUser',
get10UserReadNotificationApi:'api/user/get10ReadUserNotifications',
get10userUnreadNotificationApi:'api/user/get10UnreadUserNotifications',


//Remainder Api

createRemainderApi:'api/reminder/createReminder',
getAllRemainderApi:'api/reminder/getAllReminder',
getReaminderForOptionApi:'api/reminder/getReminderForOptions',
updateReminder:'api/reminder/updateReminderById',
getReminderById:'api/reminder/getReminderById',
deleteReminder:"api/reminder/deleteReminderById",

};
