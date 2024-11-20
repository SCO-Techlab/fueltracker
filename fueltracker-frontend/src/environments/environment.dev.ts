const environment = {
  name: "dev",
  production: false,
  apiUrl: "http://localhost:3300/api/v1",
  socketUrl: "ws://localhost:3300",
  httpsEnabled: false,
};

environment.apiUrl = !environment.httpsEnabled
  ? environment.apiUrl
  : environment.apiUrl.replace('http', 'https');

  environment.socketUrl = !environment.httpsEnabled
  ? environment.socketUrl
  : environment.socketUrl.replace('ws', 'wss');

export default environment;