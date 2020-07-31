import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

import {Item} from '../model/item'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  url:string = 'https://mytodoappbackend.herokuapp.com/api/';
  
  constructor(private http:HttpClient) { }

  getTodoItems():Observable<Item[]>{
    return this.http.get<Item[]>(this.url)
  }

  addTodoItem(item: Item):Observable<any>{
    const api = this.url + 'todo/'
    return this.http.post(api,item,httpOptions)
  }

  deleteTodoItem(id):Observable<any>{
    const api = this.url + 'todo/' + id
    return this.http.delete(api)
  }

  editTodoItem(id,item:Item):Observable<any>{
    const api = this.url + 'todo/' + id
    return this.http.put(api,item,httpOptions)
  }

  deleteSelectedItem(ids):Observable<any>{
    console.log('IDS : ',ids)
    const api = this.url + 'todo/delete'
    return this.http.post(api,ids,httpOptions)
  }
}
