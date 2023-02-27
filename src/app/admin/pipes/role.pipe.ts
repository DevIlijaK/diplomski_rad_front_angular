import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'role'})
export class RolePipe implements PipeTransform {
  transform(role: string, ...args: any[]): any {
    role = role.toLowerCase();
    role == 'professor' ? role = 'profesor' : role;
    return role.substring(5);
  }
}
