import marked from 'marked';
import hljs from 'highlight.js';

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
