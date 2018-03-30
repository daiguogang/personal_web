import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "statusPipe"})
export class StatusPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return "草稿";
    } else if (value === 1) {
      return "正常发布";
    } else if (value === 2) {
      return "回收站";
    } else {
      return "未知";
    }
  }

}
