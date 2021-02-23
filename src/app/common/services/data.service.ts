import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) {

    }

    getUser(){
        return this.http.get('http://localhost:3000/user');
    }

    getTickets(){
        return this.http.get('http://localhost:3000/ticket');
    }

    getStatus(){
        return this.http.get('http://localhost:3000/status');
    }

    updateTicketStatus(item, status){
        item.status = parseInt(status);
        return this.http.put('http://localhost:3000/ticket/' + item.id, item);  
    }
}
