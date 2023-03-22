import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { APP_ENV } from '@esm/core';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Registering Syncfusion license key
registerLicense(environment.SYNCFUSION_LICENSE);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([{ provide: APP_ENV, useValue: environment }])
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
