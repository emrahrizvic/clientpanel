import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  clientId: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnEdit = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    // Get ID
    // tslint:disable-next-line:no-string-literal
    this.clientId = this.route.snapshot.params['clientId'];

    // Get client
    this.clientService.getClient(this.clientId).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields.', {cssClass: 'flashfade alert_message alert-danger', timeout: 5000});
      this.router.navigate(['/edit-client/' + this.clientId]);
    } else {
      // Update the client
      this.clientService.updateClient(this.clientId, value);
      this.flashMessagesService.show('Client is updated.', {cssClass: 'flashfade alert_message alert-success', timeout: 5000});
      this.router.navigate(['/client/' + this.clientId]);
    }
  }

}
