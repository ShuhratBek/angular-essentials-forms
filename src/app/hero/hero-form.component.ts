import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hero }    from './hero';
@Component({
    selector: 'hero-form',
    template: require('./hero-form.component.html')
})
export class HeroFormComponent {
    powers = [
        'Really Smart',
        'Super Flexible',
        'Super Hot',
        'Weather Changer'
    ];
    model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
    oldValue = {};

    onSubmit(heroForm: NgForm) {
        this.oldValue = heroForm.value;
        console.log(this.oldValue);
        this.newHero();
        heroForm.reset();
    }
    newHero() {
        this.model = new Hero(42, '', '');
    }
}
