import { Component, Input, Output, EventEmitter } from '@angular/core';

type UserTypeAliases = {
  id: string;
  name: string;
  avatar: string;
}

interface UserInterface {
    id: string;
    name: string;
    avatar: string;
  }

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  
  // Object as input
  // @Input ({ required: true }) user!: {
  //   id: string;
  //   avatar: string;
  //   name: string;
  // };

  // Type Aliases
  // @Input({ required: true }) user!: UserTypeAliases ;

  // Interface
  @Input({ required: true }) user!: UserInterface;
  

  @Output() select = new EventEmitter();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
