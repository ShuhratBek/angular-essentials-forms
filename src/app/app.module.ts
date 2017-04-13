import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';

import { HeroDetailComponent, HeroListComponent, HeroService } from './hero';

@NgModule({
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroListComponent
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
