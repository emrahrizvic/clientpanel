import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disabledBalanceOnAdd = true;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (this.disabledBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields.', {cssClass: 'flashfade alert_message alert-danger', timeout: 5000});
      this.router.navigate(['add-client']);
    } else {
      // Add new client
      this.clientService.newClient(value);
      this.flashMessagesService.show('New client added.', {cssClass: 'flashfade alert_message alert-success', timeout: 5000});
      this.router.navigate(['/']);
    }
  }

}
