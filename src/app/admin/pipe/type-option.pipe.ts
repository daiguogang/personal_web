import {Pipe,PipeTransform} from "@angular/core";

@Pipe({name:'typeOption'})
export class TypeOptionPipe implements PipeTransform {
  transform(value: number): string {
    if(value === 0) {
      return "技术教程类";
    }else if(value === 1) {
      return "中文散文随笔类";
    }else if(value === 2) {
      return "英文文学演讲类";
    }else {
      return "";
    }
  }
}
