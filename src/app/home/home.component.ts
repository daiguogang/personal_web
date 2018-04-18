import {Component, OnInit} from "@angular/core";

@Component({
  selector:'app-home',
  templateUrl:'./home.component.html',
  styleUrls:['./home.component.css']
})

export class HomeComponent implements OnInit {

  poemText:string;
  poemTempText:string;

  ngOnInit() {
    this.poemTempText = `这是一段测试文字，首页正在开发中，落霞与孤鹜齐飞，秋水共长天一色`;
    let i = 0;
    let timer = setInterval(() => {
      this.poemText = this.poemTempText.substring(0,i);
      i++;
      if(this.poemText.length === this.poemTempText.length) {
        clearInterval(timer);
      }
    },100);

  }


}
