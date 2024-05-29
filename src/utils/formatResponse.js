const formatResponse = (data) => {
  const response = {};

  if (data) {
    response.statusCode = 0;
    response.message = 'Success';
    response.data = data;
  } else {
    response.statusCode = 1;
    response.message = 'No data found';
  }

  return response;
};

module.exports = {
  formatResponse,
};
