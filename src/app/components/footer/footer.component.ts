import { Component } from '@angular/core';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  githubIcon = faGithub
  linkedInIcon = faLinkedin

  currentYear: number = new Date().getFullYear();

}
