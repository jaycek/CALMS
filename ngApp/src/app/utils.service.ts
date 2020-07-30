import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private _addebillUrl = "http://localhost:3000/addebill";
  private _getEBServiceUrl = "http://localhost:3000/getEBService";
  private _updateEBServiceUrl="http://localhost:3000/updateEbill";
  private _deleteEBServiceUrl="http://localhost:3000/deleteEBill";
  private _addTaskUrl="http://localhost:3000/addtask";
  private _updatetaskUrl="http://localhost:3000/updatetask";
  private _gettasksUrl="http://localhost:3000/gettasks";
  private _getincompletetasksUrl="http://localhost:3000/getincompletetasks";
  private _getsingletaskUrl ="http://localhost:3000/getsingletask";
  private _completetaskUrl="http://localhost:3000/completetask";
  private _sendmailUrl="http://localhost:3000/sendmail";
  private _deletetasksforUserUrl = "http://localhost:3000/deletetasksforUser";
  private _deletetasksforUserandservicetypeUrl = "http://localhost:3000/deletetasksforUserandservicetype";
  private _addlabserviceUrl = "http://localhost:3000/addlabservice";
  private _getlabServiceUrl = "http://localhost:3000/getlabService";
  private _updateLabserviceUrl = "http://localhost:3000/updateLabservice";
  private _deleteLabserviceUrl= "http://localhost:3000/deleteLabservice";

  constructor(private http: HttpClient) { }

  addEbill(billdata){
    console.log(billdata);
    return this.http.post(this._addebillUrl,billdata);
  }

  getEBService(userID){
    return this.http.post(this._getEBServiceUrl,{userID:userID});
  }

  updateEBService(ebill){
    return this.http.post(this._updateEBServiceUrl,ebill);

  }

  deleteEBService(userID){
    return this.http.post(this._deleteEBServiceUrl,{userID:userID});
  }

  addTask(task){
    return this.http.post(this._addTaskUrl,task);
  }

  updatetask(task){
    return this.http.post(this._updatetaskUrl,task);

  }

  deletetasksforUser(id){
    return this.http.post(this._deletetasksforUserUrl,{"userID":id});
  }
  
  deletetasksforuserandservicetype(id,type){
    return this.http.post(this._deletetasksforUserandservicetypeUrl,{"userID":id,"servicetype":type});

  }
  gettasks(){
    return this.http.get(this._gettasksUrl);
  }

  getincompletetasks(){
    return this.http.get(this._getincompletetasksUrl);
  }

  getsingletask(_id){
    return this.http.post(this._getsingletaskUrl,{_id:_id});
  }

  completetask(_id){
  return this.http.post(this._completetaskUrl,{_id:_id});
  }
  
  sendmail(mail){
    return this.http.post(this._sendmailUrl,mail);
  }

  addlabservice(labdata){
    console.log(labdata);
    return this.http.post(this._addlabserviceUrl,labdata);
  }

  getLabService(userID){
    return this.http.post(this._getlabServiceUrl,{userID:userID});
  }

  updateLabservice(labdata){
    return this.http.post(this._updateLabserviceUrl,labdata)
  }

  deleteLabService(userID){
    return this.http.post(this._deleteLabserviceUrl,{userID:userID});
  }
}
