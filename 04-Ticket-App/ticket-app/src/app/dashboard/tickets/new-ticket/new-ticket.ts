import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Button } from '../../../shared/button/button';
import { Control } from '../../../shared/control/control';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  templateUrl: './new-ticket.html',
  styleUrl: './new-ticket.css',
  imports: [Button, Control, FormsModule],
})
export class NewTicket{
  // @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  onSubmit(title: string, ticketText: String) {
    console.log(title);
    console.log(ticketText);

    this.form().nativeElement.reset();
  }
}
