const endpoint = Object.freeze({
  dev: `localhost:3333`,
  prod: ``,
  get: address => {
    let environment = "dev";
    if (process.env.ENVIRONMENT == "production") {
      environment = "prod";
    }
    return `http://${endpoint[environment]}/${address}`;
  }
});

export default endpoint;
