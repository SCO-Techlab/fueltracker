const environment = {
  name: 'prod',
  production: true,
  apiUrl: 'http://fueltracker.sco-techlab.es:3300/api/v1',
  socketUrl: 'ws://fueltracker.sco-techlab.es:3300',
  httpsEnabled: true,
};

environment.apiUrl = !environment.httpsEnabled
  ? environment.apiUrl
  : environment.apiUrl.replace('http', 'https');

  environment.socketUrl = !environment.httpsEnabled
  ? environment.socketUrl
  : environment.socketUrl.replace('ws', 'wss');
  
export default environment;