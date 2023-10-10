export const handler = async (event) => {
  const options = ["yes", "no"];
  const randomIndex = Math.floor(Math.random() * options.length);
  const response = {
    statusCode: 200,
    body: JSON.stringify(options[randomIndex]),
  };
  return response;
};

  