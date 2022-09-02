export const mediatorConf = {
  urn: 'urn:mediator:zanemr-mediator',
  version: '1.0.0',
  name: 'ZanEmr Mediator',
  description: 'ZanEmr Mediator',
  defaultChannelConfig: [
    {
      name: 'ZanEmr to Dhis2 Channel',
      urlPattern: '^/ZanEmrreport$',
      routes: [
        {
          name: 'ZanEmr to Dhis2 Route',
          host: 'zanemr-mediator',
          path: '/',
          port: '3000',
          primary: true,
          type: 'http',
        },
      ],
      allow: ['admin'],
      methods: ['GET', 'POST'],
      type: 'http',
    },
  ],
  endpoints: [
    {
      name: 'ZanEmr Mediator',
      host: 'zanemr-mediator',
      path: '/',
      port: '3000',
      primary: true,
      type: 'http',
    },
  ],
};
