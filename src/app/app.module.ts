import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import { HeroFormComponent } from './hero';

@NgModule({
    declarations: [
        AppComponent,
        HeroFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        // routing
    ],
    // providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})

export class AppModule {
}
