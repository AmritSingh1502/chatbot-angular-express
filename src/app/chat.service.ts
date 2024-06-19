import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly backendUrl = 'http://localhost:3000/bot'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  sendMessageToBackend(message: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}?message=${encodeURIComponent(message)}`);
  }
}
