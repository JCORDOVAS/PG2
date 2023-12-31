import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';
import { EditUsersComponent } from '../components/edit-users/edit-users.component';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  isLoading$;
  isLoading = false;

  totalPages = 1;
  currentPage = 1;
  
  state:any = '';
  search:any = '';

  users:any = [];
  constructor(
    public fb:FormBuilder,
    public _userService: UsersService,
    public modelService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.allUsers();
  }

  allUsers(page=1){
    this._userService.allUsers(page,this.state,this.search).subscribe((resp:any) => {
      console.log(resp);
      this.users = resp.users.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  reset(){
    this.state = '';
    this.search = '';
    this.allUsers();
  }
  addUser(){
    const modalRef = this.modelService.open(AddUsersComponent, {centered : true, size: 'md'});
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )
    modalRef.componentInstance.usersE.subscribe((resp:any) => {
      console.log(resp);
      resp.state = 1;
      this.users.unshift(resp);
    })
  }

  editUser(user){
    const modalRef = this.modelService.open(EditUsersComponent, {centered : true, size: 'md'});
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )
    modalRef.componentInstance.usersE.subscribe((resp:any) => {
      console.log(resp);
      let INDEX = this.users.findIndex(user => user.id == resp.id);
      this.users[INDEX] = resp;
    })
  }

  delete(user){
    const modalRef = this.modelService.open(DeleteUserComponent, {centered : true, size: 'md'});
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )
    modalRef.componentInstance.usersE.subscribe((resp:any) => {
      console.log(resp);
      let INDEX = this.users.findIndex(user => user.id == resp.id);
      this.users.splice(INDEX,1);
    })
  }


  loadPage(index){
    this.allUsers(index);
  }
}
