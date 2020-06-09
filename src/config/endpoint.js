const endpoint = Object.freeze({
  dev: process.env.VUE_APP_URL,
  prod: process.env.VUE_APP_URL,
  get: address => {
    let environment = "dev";
    // if (process.env.ENVIRONMENT == "production") {
    //   environment = "prod";
    // }
    console.log(endpoint[environment])
    console.log(address)
    return `http://${endpoint[environment]}/${address}`;
  }
});

export default endpoint;
