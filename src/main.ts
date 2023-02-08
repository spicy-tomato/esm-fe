import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { APP_ENV } from 'src/core/config';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([{ provide: APP_ENV, useValue: environment }])
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
