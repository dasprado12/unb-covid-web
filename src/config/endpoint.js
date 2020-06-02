const endpoint = Object.freeze({
  dev: `http://35.215.210.191:3333`,
  prod: `localhost:3333`,
  get: address => {
    let environment = "dev";
    if (process.env.ENVIRONMENT == "production") {
      environment = "prod";
    }
    console.log(endpoint[environment])
    console.log(address)
    return `http://${endpoint[environment]}/${address}`;
  }
});

export default endpoint;
