import { Component, OnInit } from '@angular/core';

import {Item} from '../../model/item'
import {DataService} from '../../service/data.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [DataService]
})
export class ListComponent implements OnInit {

  itemList: Item[] = [];
  alert: string = null;
  success:boolean;
  ids:string[];
  selectitem:Item ;
  toggleForm:boolean = false;

  constructor(private dataservice:DataService) { }

  ngOnInit(): void {
      this.dataservice.getTodoItems().subscribe(items => {
        this.itemList = items;
      })
      this.ids = new Array<string>()
  }

  addItem(form){
    let newItem: Item = {
      name: form.value.itemName,
      quantity: form.value.itemQuantity
    }

    this.dataservice.addTodoItem(newItem).subscribe(message => {
      if(message.success == true){
        this.ngOnInit()
      }
    })
  }

  deleteItem(id){
    this.dataservice.deleteTodoItem(id).subscribe(message => {
      if(message.success == true){
        this.success = true
        this.alert = 'Item successfully deleted'
        this.ngOnInit()
      }
      else if(message.error == true){
        this.success = false
        this.alert = 'Item could not be deleted'
        this.ngOnInit()
      }
      
    })
  }

  showEditForm(item){
    this.selectitem = item;
    console.log(this.selectitem)
    this.toggleForm = !this.toggleForm;
  }

  editItem(form){
    let updatedItem:Item = {
      name: form.value.itemName,
      quantity: form.value.itemQuantity
    }
    this.toggleForm = !this.toggleForm
    this.dataservice.editTodoItem(this.selectitem._id,updatedItem).subscribe(message => {
      if(message.success){
        this.ngOnInit();
      }
    })
  }

  addselecteditem(e:any,id:string){
    if(e.target.checked){
      this.ids.push(id);
      console.log(this.ids)
    }
    else{
      this.ids = this.ids.filter(m=>m!=id)
      console.log(this.ids)
    }
  }

  deleteselected(){
      this.dataservice.deleteSelectedItem(this.ids).subscribe(message => {
        if(message.success){
          this.ngOnInit()
        }
      })
  }


}
