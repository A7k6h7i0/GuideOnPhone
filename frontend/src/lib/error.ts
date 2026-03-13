export const getApiErrorMessage = (error: any, fallback = "Something went wrong. Please try again.") => {
  const responseData = error?.response?.data;
  if (!responseData) {
    return fallback;
  }

  if (Array.isArray(responseData.details) && responseData.details.length > 0) {
    const first = responseData.details[0];
    if (typeof first?.message === "string") {
      return first.message;
    }
  }

  const bodyFieldErrors = responseData?.errors?.fieldErrors?.body;
  if (Array.isArray(bodyFieldErrors) && bodyFieldErrors.length > 0) {
    return bodyFieldErrors[0];
  }

  if (typeof responseData.message === "string") {
    return responseData.message;
  }

  return fallback;
};
