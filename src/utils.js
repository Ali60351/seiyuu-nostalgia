export const getErrorMessage = errors =>  {
  if (errors.response)
    return errors.response.data.errors.map(error => error.message).join(" ")
  else
    return "Connection Failed"
}