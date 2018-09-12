import { Employee } from './../../models/employee';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter', pure: false})

export class filterEmployee implements PipeTransform {
    transform(items: Employee[], searchtext: string): any[] {
        if(!items) return [];
        if(!searchtext) return items;
        
        searchtext = searchtext.toLowerCase();

        return items.filter( it => {
            return it.nameEmployee.includes(searchtext);
        });
   }
}