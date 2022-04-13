export function defaultError(response: any) {
  return {
    status: {
      code: response.code || 9999,
      header: "Unable to proceed",
      description: "Oops! Something went wrong.",
      moreInfo: response.message
    },
    data:null
  }
}
