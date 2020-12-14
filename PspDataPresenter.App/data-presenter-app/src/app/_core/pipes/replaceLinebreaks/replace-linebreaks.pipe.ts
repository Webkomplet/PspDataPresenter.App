import { Pipe, Injectable, PipeTransform } from "@angular/core";

@Pipe({ name: 'replaceLinebreaks', pure: true })
@Injectable() export class ReplaceLinebreaksPipe implements PipeTransform {

  constructor() { }

  transform(value): any {
   return value.replace(/\n/g, '<br/>');
  }

}