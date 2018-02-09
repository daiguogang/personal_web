import {MarkedOptions,MarkedRenderer} from "ngx-markdown";

export function markedOptionsFactory():MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.blockquote = (text:String) => {
    return '<blockquote class="block-quote"><p>' + text + '</p></blockquote>';
  };
  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}
