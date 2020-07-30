import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../utils.service';
import { Task } from './task.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  constructor(private _utils:UtilsService) { }
  searchAll:Boolean  = true;
  
  tasks:Task[];

  ngOnInit(): void {
      this.showalltasks();
   
  }

  toggleSearch(){
    this.searchAll=!this.searchAll;
    if(!this.searchAll){
        this.showincompletetasks();
    }
    else{
      this.showalltasks();
    }

  }
  showincompletetasks(){
    this._utils.getincompletetasks()
    .subscribe(

      res=>{
        console.log(res);
        this.tasks=[];
        this.tasks = JSON.parse(JSON.stringify(res));
      },
      err=>{
        console.log(err);
      }
    )
  }

  showalltasks(){
    this._utils.gettasks()
    .subscribe(
      res=>{
        console.log(res);

        this.tasks = JSON.parse(JSON.stringify(res));

      },
      err=>
      {
        console.log(err);

      }

    )

  }
}
