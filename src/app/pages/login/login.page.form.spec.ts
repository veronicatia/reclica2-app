import { LoginPageForm } from "./login.page.form"
import { FormBuilder, FormGroup } from "@angular/forms"

describe('LoginPageForm', () => {

    let loginPageForm: LoginPageForm;
    let form: FormGroup;

    beforeEach(() => {

        const loginPageForm = new LoginPageForm(new FormBuilder());
        const form = loginPageForm.createForm();
    })

    it('should create login form empty', () => {

        const loginPageForm = new LoginPageForm(new FormBuilder());
        const form = loginPageForm.createForm();

        expect(form).not.toBeNull();
        expect(form.get('email')).not.toBeNull();
        expect(form.get('email')!.value).toEqual(""); // Non-null assertion
        expect(form.get('email')!.valid).toBeFalsy(); // Non-null assertion

        expect(form.get('password')).not.toBeNull();
        expect(form.get('password')!.value).toEqual(""); // Non-null assertion
        expect(form.get('password')!.valid).toBeFalsy(); // Non-null assertion
    });
    it('should have email invalid email is not valid', () => {
        form.get('email')!.setValue('invalid email');

        expect(form.get('email')!.valid).toBeFalsy();
    })

    it('should have email valid if email is valid', () => {
        form.get('email')!.setValue('valid@email.com');

        expect(form.get('email')!.valid).toBeTruthy();
    })

    it('should have a valid form', () => {
        form.get('email')!.setValue('valid@email.com');
        form.get('password')!.setValue('anyPassword');

        expect(form.valid).toBeTruthy();
    })

});
