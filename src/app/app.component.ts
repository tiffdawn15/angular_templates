import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ChatbotComponent } from "./chatbot/chatbot.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, 
    ChatbotComponent, 
    ContactFormComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "templates";
}
