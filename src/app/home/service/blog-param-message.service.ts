import {Injectable} from "@angular/core";


export interface BlogMessageContent {
  contentId:number;
  categoryId:number;
  contentTxt:string;
}

@Injectable()
export class BlogParamMessageService {
  data:BlogMessageContent;
}
