import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Client } from '../models/Client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: AngularFireList<any>;
  client: Observable<any>;

  constructor(
    private af: AngularFireDatabase
  ) {
    this.clients = this.af.list('/clients');
  }

  getClients() {
    this.clients = this.af.list('/clients');
    this.client = this.clients.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.client;
  }

  newClient(client) {
    this.clients.push(client);
  }

  getClient(clientId: string) {
    this.client = this.af.object('/clients/' + clientId).snapshotChanges().pipe(
      map(c => ({ key: c.payload.key, ...c.payload.val() }))
    );
    return this.client;
  }

  updateClient(clientId: string, client: Client) {
    return this.af.object('/clients/' + clientId).update(client);
  }

  deleteClient(clientId: string) {
    return this.clients.remove(clientId);
  }
}
