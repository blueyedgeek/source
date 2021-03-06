import { createElement } from 'react';
import 'highlight.js/styles/zenburn.css';
import hljs from 'highlight.js/lib/highlight';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import hljsHTML from 'highlight.js/lib/languages/htmlbars';
import hljsCSS from 'highlight.js/lib/languages/css';
import marksy from 'marksy';

hljs.registerLanguage('javascript', hljsJavascript);
hljs.registerLanguage('html', hljsHTML);
hljs.registerLanguage('css', hljsCSS);

const compile = marksy({
  createElement,
  highlight: (language, code) => hljs.highlight(language, code).value
});

const prependToStr = (str, prependStr) => `${prependStr}${str}`;
const replaceDashWithForwardSlash = str =>
  str.replace(/\d+-/g, match => match.replace('-', '/'));
const removeFileExtension = (str, ext) =>
  str.replace(new RegExp(`.${ext}$`), '');
const removeLeadingDotFromPath = str => {
  if (str[0] === '.') return str.substr(1);
  return str;
};

export default class PostResolver {
  constructor(filePath) {
    this.filePath = filePath;
    this.markdownStr = require(`../posts/${filePath.substr(2)}`);
    this.compiledMdObj = compile(this.markdownStr);
  }

  url() {
    let result = removeFileExtension(this.filePath, 'md');
    result = removeLeadingDotFromPath(result);
    result = replaceDashWithForwardSlash(result);
    result = prependToStr(result, '/posts');

    return result;
  }

  title() {
    return this.compiledMdObj.toc[0]['title'];
  }

  date() {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const [year, mon, date] = this.filePath.match(/\d+/g);

    return `${date} ${months[parseInt(mon, 10) - 1]}, ${year}`;
  }

  summary() {
    return this.compiledMdObj.tree[1];
  }

  content() {
    return this.compiledMdObj.tree.slice(2);
  }
}
