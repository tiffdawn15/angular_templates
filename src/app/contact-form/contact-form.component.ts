import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contactForm = new FormGroup({
    name: new FormControl("", Validators.min(3)),
    email: new FormControl("", Validators.min(3)),
    message: new FormControl("", Validators.min(3)),
  });

  constructor(private contactService: ContactService) {}

  onSubmit() {
    console.log(this.contactForm.value);
    const from = {
      name:
        this.contactForm?.get("name")?.value !== null
          ? this.contactForm.get("name")?.value
          : "",
      email: this.contactForm.get("email")?.value,
    };

    const to = [
      {
        name: "Tiff",
        email: "tiffanymesser15@gmail.com",
      },
    ];
    // TODO: Implement Good object practices here
    const message = {
      sender: from,
      to: to,
      htmlContent: this.contactForm.get("message")?.value,
      subject: "Email from our Website",
      replyTo: from,
    };

    console.log(message);

    this.contactService.sendEmail(message).subscribe(
      (response) => console.log("Success!", response),
      (error) => console.error("Error!", error)
    );
  }
}
