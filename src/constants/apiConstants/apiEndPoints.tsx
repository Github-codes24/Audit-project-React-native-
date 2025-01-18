import { AboutUs } from "../../asstets/images/svg";

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
  
//complaince API endpoint
getCompilanceQuestionsCategory:'api/complianceCategory/getAllComplianceCategoryNames',
getcompilanceQuestions:'api/complianceQuestions/getQuestions',
calculateCompilanceScore:'api/complianceQuestions/calculateScore',

//Eligibility API endpoint
getEligibilityCategory:'api/eligibilityCategory/getAllEligibilityCategoryNames',
getEligibilityQuestions:'api/eligibilityQuestions/getQuestions',

//profile api endpoint
getPrivacyPolicy:'api/privacyPolicy/getPrivacyPolicy',
getTermAndDondition:'api/termsAndConditions/getTermsAndConditions',

//blogs api endpoint
getAllBlogs:'api/blogRoutes/getAllBlogs',
getBlogById:'api/blogRoutes/getBlogById',

//customer support api slice
contactUs:'api/contactUs/createContactUs',
aboutUs:'api/aboutUs/getAboutUs',



};
