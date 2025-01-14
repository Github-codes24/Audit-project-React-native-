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
getcompilanceQuestions:'api/compilanceQuestions/getQuestions',
calculateCompilanceScore:'api/compilanceQuestions/calculateScore',

//Eligibility API endpoint
getEligibilityCategory:'api/eligibilityCategory/getAllEligibilityCategoryNames',
getEligibilityQuestions:'api/eligibilityQuestions/getQuestions',

};
