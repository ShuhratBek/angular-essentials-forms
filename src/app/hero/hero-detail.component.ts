import { Component, Input, OnChanges }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Address, Hero, states } from './data-model';
import { HeroService }           from './hero.service';
import {forbiddenNameValidator} from "./forbidden-name.directive";

@Component({
    selector: 'hero-detail',
    template: require('./hero-detail.component.html')
})
export class HeroDetailComponent implements OnChanges {
    @Input() hero: Hero;

    heroForm: FormGroup;
    nameChangeLog: string[] = [];
    states = states;

    constructor(
        private fb: FormBuilder,
        private heroService: HeroService) {

        this.createForm();
        this.logNameChange();
    }

    createForm() {
        this.heroForm = this.fb.group({
            name: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(24),
                    Validators.pattern('[\\w\\-\\s\\/]+'),
                    forbiddenNameValidator(/angular/i)
                ])
            ],
            secretLairs: this.fb.array([]),
            power: '',
            sidekick: ''
        });

        this.heroForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }

    formErrors = {
        'name': '',
        'power': ''
    };
    validationMessages = {
        'name': {
            'required':      'Name is required.',
            'minlength':     'Name must be at least 4 characters long.',
            'maxlength':     'Name cannot be more than 24 characters long.',
            'pattern':     'Incorrect pattern',
            'forbiddenName': 'Someone named "Angular" cannot be a hero.'
        },
        'power': {
            'required': 'Power is required.'
        }
    };

    onValueChanged(data?: any) {
        if (!this.heroForm) { return; }
        const form = this.heroForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    ngOnChanges() {
        this.heroForm.reset({
            name: this.hero.name
        });
        this.setAddresses(this.hero.addresses);
    }

    get secretLairs(): FormArray {
        return this.heroForm.get('secretLairs') as FormArray;
    };

    setAddresses(addresses: Address[]) {
        const addressFGs = addresses.map(address => this.fb.group(address));
        const addressFormArray = this.fb.array(addressFGs);
        this.heroForm.setControl('secretLairs', addressFormArray);
    }

    addLair() {
        this.secretLairs.push(this.fb.group(new Address()));
    }

    onSubmit() {
        this.hero = this.prepareSaveHero();
        this.heroService.updateHero(this.hero).subscribe(/* error handling */);
        this.ngOnChanges();
    }

    prepareSaveHero(): Hero {
        const formModel = this.heroForm.value;

        // deep copy of form model lairs
        const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
            (address: Address) => Object.assign({}, address)
        );

        // return new `Hero` object containing a combination of original hero value(s)
        // and deep copies of changed form model values
        const saveHero: Hero = {
            id: this.hero.id,
            name: formModel.name as string,
            // addresses: formModel.secretLairs // <-- bad!
            addresses: secretLairsDeepCopy
        };
        return saveHero;
    }

    revert() { this.ngOnChanges(); }

    logNameChange() {
        const nameControl = this.heroForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        );
    }
}
