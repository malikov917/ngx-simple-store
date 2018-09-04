import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { NgxSimpleStoreService } from './ngx-simple-store.service';

export const ConfigService = new InjectionToken<any>('object');

@NgModule()
export class NgxSimpleStoreModule {
  static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: NgxSimpleStoreModule,
      providers: [
        NgxSimpleStoreService,
        {
          provide: ConfigService,
          useValue: config
        }
      ]
    };
  }
}
