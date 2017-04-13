import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';

import { HeroDetailComponent, HeroListComponent, HeroService, ForbiddenValidatorDirective } from './hero';

@NgModule({
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroListComponent,
        ForbiddenValidatorDirective
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        // routing
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
