import { Component, OnInit } from '@angular/core';
import { DataService } from './common/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'code-test';
    user: any;
    userName: string = '';
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

    ticketStatusList: any;
    userIconStatus = 0;

    totalTasks = 0;
    totalBugs = 0;    
    totalCompleted = 0;
    totalInProgress = 0;
    totalNotStarted = 0;

    constructor(private dataService: DataService){
    }

    ngOnInit(){
        this.dataService.getUser().subscribe(user => {
            this.user = user; 
            this.userName = this.user[0].name;
        })
        this.dataService.getTickets().subscribe(tickets => {
            this.tickets = tickets;      
            this.getCountByGroup();      
        })
        this.dataService.getStatus().subscribe(status => {
            this.ticketStatusList = status;
        })
    }

    getCountByGroup(){
        this.totalTasks = this.groupByStatus(this.tickets, {type: [1]}).length;
        this.totalBugs = this.groupByStatus(this.tickets, {type: [2]}).length;
        this.totalCompleted = this.groupByStatus(this.tickets, {status: [1]}).length;
        this.totalInProgress = this.groupByStatus(this.tickets, {status: [2]}).length;
        this.totalNotStarted = this.groupByStatus(this.tickets, {status: [3]}).length;
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
        this.updateView();    
    }

    updateUserIcon(){
        if(this.filterCriteria.status.length===1){
            this.userIconStatus = this.filterCriteria.status[0];
        }else{
            this.userIconStatus = 0;
        }
    }

    toggleAction(){

    }

    pickSelectedFilterCriterias(filter){
        let query = {};
        for (let keys in filter) {
            if (filter[keys].constructor === Array && filter[keys].length > 0) {
                query[keys] = filter[keys];
            }
        }
        return query;
    }

    groupByStatus(data, query){
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

    updateStatus(index, status){        
        this.dataService.updateTicketStatus(this.filteredList[index], status).subscribe(res => {
            this.updateView();    
        })
    }

    updateView(){        
        if(this.filterCriteria.type.length > 0 || this.filterCriteria.status.length > 0){
            const query = this.pickSelectedFilterCriterias(this.filterCriteria);       
            this.filteredList = [];
            this.filteredList = this.groupByStatus(this.tickets, query);
            this.updateUserIcon();  
            this.getCountByGroup();    
        }else{
            this.filteredList = [];
        }    
    }
   
}
