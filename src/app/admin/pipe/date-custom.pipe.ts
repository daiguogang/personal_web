import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name:"dateCustom"})
export class DateCustomPipe implements PipeTransform {
  transform(value:number):string {
    let timePublish = new Date(value);
    let timeNow = new Date();
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    let diffValue = timeNow.valueOf() - timePublish.valueOf();
    let diffMonth = Math.round(diffValue / month);
    let diffWeek = Math.round(diffValue / (7 * day));
    let diffDay = Math.round(diffValue / day);
    let diffHour = Math.round(diffValue / hour);
    let diffMinute = Math.round(diffValue / minute);

    let result:string;

    if (diffValue < 0) {
      result = "错误时间";
    } else if (diffMonth > 3) {
      result = timePublish.getFullYear()+"-";
      result += timePublish.getMonth() + "-";
      result += timePublish.getDate();
      alert(result);
    } else if (diffMonth > 1) {
      result =  diffMonth+ "月前";
    } else if (diffWeek > 1) {
      result = diffWeek + "周前";
    } else if (diffDay > 1) {
      result = diffDay + "天前";
    } else if (diffHour >= 1) {
      result = diffHour + "小时前";
    } else if (diffMinute > 1 && diffMinute <= 59) {
      result = diffMinute + "分钟前";
    } else {
      result = "刚刚发表";
    }
    return result;
  }
}
