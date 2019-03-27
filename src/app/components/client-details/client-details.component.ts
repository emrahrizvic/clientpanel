import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  clientId: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

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
      if (client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
    });
  }

  updateBalance(clientId: string) {
    // Update client
    this.clientService.updateClient(clientId, this.client);
    this.flashMessagesService.show('Balance Updated.', {cssClass: 'flashfade alert_message alert-success', timeout: 5000});
    this.router.navigate(['/client/' + clientId]);
  }

  onDeleteClick() {
    if (confirm('Are you sure to delete?')) {
      this.clientService.deleteClient(this.clientId);
    }
    this.flashMessagesService.show('Client Deleted.', {cssClass: 'flashfade alert_message alert-danger', timeout: 5000});
    this.router.navigate(['/']);
  }

}
