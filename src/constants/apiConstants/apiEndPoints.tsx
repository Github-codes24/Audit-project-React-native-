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
  getQuestionsCategory:'api/complianceCategory/getAllComplianceCategoryNames',
getcompilanceQuestionsQuestions:'api/compilanceQuestions/getQuestions',
calculateScore:'api/compilanceQuestions/calculateScore',

//Eligibility API endpoint
getEligibilityCategory:'api/eligibilityCategory/getAllEligibilityCategoryNames',
getEligibilityQuestions:'api/eligibilityQuestions/getQuestions',

};
