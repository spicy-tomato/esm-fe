require('dotenv').config();

const path = require('path');
const { generateApi } = require('swagger-typescript-api');
const generateOperationId = require('./generateOperationId');
const customTranslator = require('./custom-translator').CustomTranslator;

generateApi({
  input: path.resolve(__dirname, './swagger.yaml'),
  output: path.resolve(__dirname, '../src/app/shared/api/__generated__'),
  httpClientType: 'axios',
  customTranslator: customTranslator,
  prettier: {
    proseWrap: 'always',
    singleQuote: true,
    printWidth: 80,
  },
  modular: true,
  extractRequestBody: true,
  extractRequestParams: true,
  extractResponseBody: true,
  extractResponseError: true,
  generateResponses: true,
  cleanOutput: true,
  templates: path.resolve(__dirname, './templates'),
  sortTypes: true,
  extractingOptions: {
    requestParamsSuffix: ['Query'],
  },
  primitiveTypeConstructs: (struct) => ({
    string: {
      'date-time': 'Date',
    },
  }),
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
