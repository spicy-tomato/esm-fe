const fs = require('fs');
const path = require('path');

const dir = 'src/environments';
const file = 'environment.ts';
const prodFile = 'environment.prod.ts';

const content = `
import { AppEnv } from '@esm/core';

export const environment: AppEnv = {
  production: true,
  baseUrl: '${process.env.BASE_URL}',
  syncfusionLicense: '${process.env.SYNCFUSION_LICENSE}',
  recaptcha: {
    siteKey: '${process.env.RECAPTCHA_SITE_KEY}',
  },
  defaultPassword: '${process.env.DEFAULT_PASSWORD}',
};
`;

fs.access(dir, fs.constants.F_OK, (err) => {
  if (err) {
    console.log(`src doesn't exist, creating now`, process.cwd());
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  try {
    fs.writeFileSync(dir + '/' + file, content);
    fs.writeFileSync(dir + '/' + prodFile, content);
    console.log('Created successfully in ', process.cwd());

    if (fs.existsSync(dir + '/' + file)) {
      console.log('File is created', path.resolve(dir + '/' + file));
      const str = fs.readFileSync(dir + '/' + file).toString();
      console.log(str);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
