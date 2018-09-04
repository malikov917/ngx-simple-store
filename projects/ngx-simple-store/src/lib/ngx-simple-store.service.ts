import { Injectable, Inject } from '@angular/core';
import { ConfigService } from './ngx-simple-store.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxSimpleStoreService {

  constructor(@Inject(ConfigService) private config) {
    Object.keys(config)
    .map(key => config[key])
    .forEach(x => this[x] = new BehaviorSubject<any>(null));
  }

  select(name) {
    return this[name].asObservable();
  }

  next(name, value) {
    this[name].next(value);
  }

  getOnce(name) {
    return this[name].getValue();
  }
}
