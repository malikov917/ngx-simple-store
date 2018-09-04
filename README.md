# Angular Application Store

Simple store for application based on Subject service and your enum for describing application
state. There are three ways to use it. Subscribe for latest changes, get value once or subscribe
via async pipe in template directly.

## Example

###### #1 Installing to project
> npm i ngx-simple-store --save

###### #2 Available methods:
> select(name); // here you can subscribe by name

> next(name, value); // setting a new value

> getOnce(name); // get what you want without subscription 

###### #3 Initialization of module and making your app state as enum:
```
//Your ./app.module.ts:
import { NgxSimpleStore } from 'ngx-simple-store';

export enum AppState {
  isSideBarOpened = 'isSideBarOpened',
  isDarkTheme = 'isDarkTheme',
  refreshTableState = 'refreshTableState'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSimpleStoreModule.forRoot(AppState) //our module
  ],
  providers: [],
  bootstrap: [AppComponent]
})

```
###### #4.1 Adding to component "A":
```
@Component({
  selector: 'app-component',
  template:
  `<button (click)="toggleSideBar()">Toggle Sidebar!</button>`
})
import { NgxSimpleStore } from 'ngx-simple-store';
...
export class AppComponent {
  constructor(private appStore: NgxSimpleStoreService) { }
  
  toggleSideBar() {
    this.appStore.next(AppState.isSideBarOpened, !this.appStore.getOnce(AppState.isSideBarOpened));
  }
}
```

###### #4.2 Using in component "B":
> Three ways to use this service: by subscription, getting once, or using pipe 'async'
directly in template (my favorite one, for this you need to do this variable public).
```
import { NgxSimpleStore } from 'ngx-simple-store';
@Component({
  selector: 'second-component',
  template:
  `<div>
    One more way to use your service!
    {{ appStore.select(AppState.isSideBarOpened) | async }}
  </div>`
})
export class SecondComponent {
  isSideBarOpened;
  constructor(public appStore: NgxSimpleStoreService) {
  
    // subscribe for getting the latest changes
    this.appStore.select(AppState.isSideBarOpened)
        .subscribe(value => console.log(value));
        
    //get value once
    this.isSideBarOpened = this.appStore.getOnce(AppState.isSideBarOpened);
        
  }
}
```

## Problem

Sometimes making special services for managing state of sidebar,
dark theme of template, width of window, some events between components that are
far from each of other and so on is a headache for everyone.

In cases when you need to manage some app states that are used in many places
we're doing special service with Subject variable, writing methods for
subscribing, adding a new value, getting value once. But when we have a lot
of such places it becomes difficult and your code becomes too complicated. 

## Solution

It's just a first version of universal service which you can inject to your component "A",
inject to component "B" and use it as common service with common state (like a singleton if you want).
I have added an utility function that will convert your enum to individual Subjects by names so it 
works just as a Subject service that was made for convenient way to work with some common states.

## Use cases!

Use distinctUntilChanged for not getting same values (useful in some cases).
Use debounceTime for getting latest value in a period of time

```
this.store
    .select('isOpenedSidebar')
    .pipe(distinctUntilChanged(), debounceTime(500))
    .subscribe(value => {
      this.isSidebarOpen = value;
    });
```
