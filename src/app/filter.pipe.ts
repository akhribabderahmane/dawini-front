import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchQuery: string): any[] {
    if (!items || !searchQuery) {
      return items; // No filter applied
    }
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.age.toString().includes(searchQuery) ||
      item.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nss.toString().includes(searchQuery) ||
      item.phone.toString().includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
