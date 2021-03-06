import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AppPosition} from './app-position';

@Injectable({
  providedIn: 'root'
})
export class ServerPushService {

  constructor(private readonly httpClient: HttpClient) {
  }

  pushPosition(pos: AppPosition): void {
    this.httpClient.post(`${environment.serverURL}/pos`, pos)
      .subscribe(() => {
      }, error => this.pushError(error));
  }

  pushError(error: string): void {
    this.httpClient.post(`${environment.serverURL}/clienterror`, error, {headers: new HttpHeaders({'Content-Type': 'text/plain'})})
      .subscribe(() => {
      }, er => console.log(er));
  }

  clear(): void {
    this.httpClient.delete(`${environment.serverURL}/clear`).subscribe(() => {
    }, error => this.pushError(error));
  }

}
