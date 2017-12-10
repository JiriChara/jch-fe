import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import implicitFigures from 'markdown-it-implicit-figures';
import anchor from 'markdown-it-anchor';
import twemoji from 'twemoji';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import ruby from 'highlight.js/lib/languages/ruby';
import vim from 'highlight.js/lib/languages/vim';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('vim', vim);

const md = new MarkdownIt({
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },

  langPrefix: 'hljs ',

  html: false,
});

md.use(emoji);
md.use(implicitFigures, {
  dataType: false,
  figcaption: true,
});
md.use(anchor, {
  permalink: true,
  permalinkBefore: false,
  permalinkSymbol: '<i class="fa fa-link"></i>',
});

md.renderer.rules.emoji = (token, idx) => twemoji.parse(
  token[idx].content,
  icon => `/static/img/emoji/${icon}.svg`,
);

export default {
  bind(el, { value }) {
    el.innerHTML = md.render(value);
  },
};
