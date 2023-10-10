export const handler = async (event) => {
  try {
    const options = ["yes", "no"];
    const randomIndex = Math.floor(Math.random() * options.length);
    // TODO implement
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(options[randomIndex]),
    };
    return response;
  }
  catch(err) {
    const response = {
      statusCode: 500,
      // headers: {
      //   "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      //   "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      // },
      body: JSON.stringify('Error'),
    }
    return response;

  };
};
  