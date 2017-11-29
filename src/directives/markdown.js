import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import ruby from 'highlight.js/lib/languages/ruby';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('ruby', ruby);

marked.setOptions({
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
  langPrefix: 'hljs ',
});

export default {
  bind(el, { value }) {
    el.innerHTML = marked(value);
  },
};
