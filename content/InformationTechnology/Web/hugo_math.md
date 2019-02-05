---
title: Use Katex in Hugo
author: the_zeng
mmark: true
---

参考
https://takuti.me/note/hugo-kramdown-and-katex/
https://eankeen.github.io/blog/render-latex-with-katex-in-hugo-blog/
https://github.com/matcornic/hugo-theme-learn/issues/127
https://katex.org/docs/autorender.html

いろいろなサイトで入れ方が言われていますが，結局私が成功したのはKatex公式に書いてある
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css" integrity="sha384-9eLZqc9ds8eNjO3TmqPeYcDj8n+Qfa4nuSiGYa6DjLNcv9BtN69ZIulL9+8CqC9Y" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js" integrity="sha384-K3vbOmF2BtaVai+Qk37uypf7VrgBubhQreNQe9aGsz9lB63dIFiQVlJbr92dw2Lx" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/auto-render.min.js" integrity="sha384-kmZOZB5ObwgQnS/DuDg6TScgOiWWBiVt0plIRkZCmE6rDZGrEOQeHM5PcHi+nyqe" crossorigin="anonymous"
    onload="renderMathInElement(document.body);"></script>
```
を読み込むという方法です．
必ず読み込まれるhtmlファイルに書き込めばよいので，私はlayouts/paritals/custom-head.htmlにいれました．(DocDockテーマです．)

mmarkを使っても使わなくてもとりあえず動きはするみたいです．

これで
```cpp
$$x^2$$
```
が
$$x^2$$
のように無事数式としてレンダリングされました．