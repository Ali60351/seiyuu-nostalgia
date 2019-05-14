export const getErrorMessage = errors =>  {
  if (errors.response)
    return errors.response.data.errors.map(error => error.message).join(" ");
  else
    return "Connection Failed";
};

export const formatName = name => {
  let formattedName = "";

  if(name.first) {
    formattedName = name.first;
  }

  if(name.last) {
    formattedName = `${formattedName} ${name.last}`;
  }

  return formattedName;
};