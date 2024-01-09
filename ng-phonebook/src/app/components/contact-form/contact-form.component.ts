import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../services/contacts.service";
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Contact} from "../contact-list/contact";

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
    model = <Contact> {};
    submitted = false;
    btnName = 'Submit';
    form: FormGroup;

    constructor(private contactService: ContactService, private formBuilder: FormBuilder) {
    }

    get f(): {[key: string]: AbstractControl} {
        return this.form.controls;
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    createNew() {
        return  {} as Contact;
    }

    onSubmit() {
        this.submitted = true;

       if(this.form.valid){
        this.model.firstName = this.form.controls['firstName'].value;
        this.model.lastName = this.form.controls['lastName'].value;
        this.model.email = this.form.controls['email'].value;

      this.contactService.postContact(this.model)
            .subscribe(contact => {
                console.log('object saved', contact);
                this.model = this.createNew();
                this.submitted = false;
                this.form.reset();
            });
        }

        console.log('submitted');
    }

    validateContactForm(contactForm: NgForm) : boolean {
        return true;

    }

    get diagnostic() {
        return JSON.stringify(this.model);
    }

}
