require('dotenv').config();
const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const generateOperationId = require('./generateOperationId');

generateApi({
  input: path.resolve(__dirname, './swagger.yaml'),
  output: path.resolve(__dirname, '../src/shared/api/__generated__'),
  httpClientType: 'axios',
  cleanOutput: true,
  modular: true,
  extractRequestBody: true,
  extractRequestParams: true,
  extractResponseBody: true,
  extractResponseError: true,
  generateResponses: true,
  templates: path.resolve(__dirname, './templates'),
  sortTypes: true,
  hooks: {
    onFormatRouteName: (routeInfo, templateRouteName) => {
      if (!routeInfo.operationId) {
        return generateOperationId(routeInfo);
      }

      return templateRouteName;
    },
    onPrepareConfig: (currentConfiguration) => ({
      ...currentConfiguration,
      apiConfig: {
        ...currentConfiguration.apiConfig,
        baseUrl: 'http://localhost:5001',
      },
    }),
  },
});
