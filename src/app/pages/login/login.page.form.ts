// login.page.form.ts
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class LoginPageForm {
    constructor(private fb: FormBuilder) {}

    createForm(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}
