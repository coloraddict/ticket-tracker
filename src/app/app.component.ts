import { Component, OnInit } from '@angular/core';
import { DataService } from './common/services/data.service';
var that;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'code-test';
    tickets: any;
    filteredList: any = [];
    filterCriteria: any = {
        type: [],
        status: []
    };

    tasks = 0;
    bugs = 0;
    completed = 0;
    notStarted = 0;
    inProgress = 0;

    constructor(private dataService: DataService){
        that = this;
    }

    ngOnInit(){
        this.dataService.getTickets().subscribe(tickets => {
            this.tickets = tickets;            
        })
    }

    onClick(e){
        let name = e.target.name;
        if(name === 'Task') {
            let index = this.filterCriteria["type"].indexOf(1);            
            if(index < 0){
                this.filterCriteria["type"].push(1)                
            } else {
                this.filterCriteria["type"].splice(index,1)                
            }        
            
        } else if (name === 'Bug'){
            let index = this.filterCriteria["type"].indexOf(2);            
            if(index < 0){
                this.filterCriteria["type"].push(2)                
            } else {
                this.filterCriteria["type"].splice(index,1)                
            }   
        } else if(name === 'Completed'){
            let index = this.filterCriteria["status"].indexOf(1);            
            if(index < 0){
                this.filterCriteria["status"].push(1)                
            } else {
                this.filterCriteria["status"].splice(index,1)                
            }   
        } else if(name === 'InProgress'){
            let index = this.filterCriteria["status"].indexOf(2);            
            if(index < 0){
                this.filterCriteria["status"].push(2)                
            } else {
                this.filterCriteria["status"].splice(index,1)                
            }   
        } else if(name === 'NotStarted'){
            let index = this.filterCriteria["status"].indexOf(3);            
            if(index < 0){
                this.filterCriteria["status"].push(3)                
            } else {
                this.filterCriteria["status"].splice(index,1)                
            }   
        }

        console.log(this.filterCriteria);
        const query = this.buildFilter(this.filterCriteria);
        this.filteredList = [];
        this.filteredList = this.filter(this.tickets, query);
        console.log(this.filteredList);        
    }

    buildFilter(filter){
        let query = {};
        for (let keys in filter) {
            if (filter[keys].constructor === Array && filter[keys].length > 0) {
                query[keys] = filter[keys];
            }
        }
        return query;
    }

    filter(data, query){
        const filteredData = data.filter( (item) => {
            for (let key in query) {
                if (item[key] === undefined || !query[key].includes(item[key])) {
                    return false;
                }
            }
            return true;
        });
        return filteredData;
    };
   
}
