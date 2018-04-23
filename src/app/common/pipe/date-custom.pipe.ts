import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name:"dateCustom"})
export class DateCustomPipe implements PipeTransform {
  transform(value:number):string {
    let timePublish = new Date(value);
    let timeNow = new Date();
    // 计算2个时间相差的秒值
    let diffValue = Math.round(timeNow.valueOf()/1000 - timePublish.valueOf()/1000);


    let result:string;

    if (diffValue < 0) {
      result = "错误时间";
    } else if (diffValue >= 31104000) {
      result =  Math.floor(diffValue/31104000) + "年前";
    } else if (diffValue >= 2592000 && diffValue < 31104000) {
      result = Math.floor(diffValue/2592000) + "月前";
    } else if (diffValue >= 86400 && diffValue < 2592000) {
      result = Math.floor(diffValue/86400) + "天前";
    } else if (diffValue >= 3600 && diffValue < 86400) {
      result = Math.floor(diffValue/3600) + "小时前";
    } else if (diffValue >= 60 && diffValue < 3600) {
      result = Math.floor(diffValue/60) + "分钟前";
    } else if(diffValue >= 0 && diffValue < 60) {
      result = diffValue + "秒前";
    } else {
      result = "刚刚发表";
    }
    return result;
  }
}
