---
title: To Do　List
url: /ToDo
---

変更したい点をメモとして残しています．
変更されたものはそのやり方をHugoの設定記事に書いていくつもりです．

- permalinkに執筆者名をgithubからとってきて入れたい

- 記事に投票ボタンをつけ，ポイント順に表示する

http://klutche.org/archives/1741/
ここら辺が参考になりそう．
Ajaxを使う．

- h3,h4タグそれぞれのデザインの変更
下線がつくやつとかボックスタイプが欲しい．
Qiitaに合わせたい．

- Netlifyに独自ドメインを設定

- サイドメニューをもう少し広くする

- スマホでnavigationマークがついてくるようにしたい

## h1 h2 タグなどのデザインの変更
/static/scss/original/main.scss
で設定されているようです．

flexの場合は
/static/scss/flex/article.scssかな

サイドメニューを広くするのも/static/original/sidebar.scssを変えればいいかな．

scssとは？
markdownがhtmlになるノリでsccsはcssにコンパイルされるようです．
（ということは以前cssをダイレクトにいじっていたのはあまり褒められたことではないかも...）


CSSをデザインする場合のおすすめの方法は？

SCCSの
extendという機能を使えば，必要なところだけオーバーライドできるらしいです．
https://qiita.com/sasuraisan/items/9a9dfb281cfdf5a12bd3

static/theme-original/style.cssに
Built with SCCSと書いてあるのでおそらくこれはSCCSがコンパイルされた結果だと思います．

/layouts/partials/original/head.htmlで読み込むのは
/theme-original/style.cssだけでscssは読み込まれないようです．

sccsを変更→stylecssをコンパイル

という流れは大変なのでstyle.cssの変えたい場所だけを自分のファイルで上書きさせるのがいいかと思います．

ブラウザーのsource map featureで中身が分かるらしいです．

ulやliが何をさす？

デベロッパーツールでどこが該当するかを調べていきます．
サイドバーの大きさはstyle.cssで書かれています．
これを部分的に上書きするスタイルだとなぜかうまくいかなかったので，style.css自体が上書きされるように/static/css/の中にコピーし，コピーしたものをいじっていきます．

```css
@media only all and (max-width: 59.938em) {
  #sidebar {
    width: 270px; } /* changed from 230px*/

  #body {
    margin-left: 270px; } }/* changed from 230px*/
@media only all and (max-width: 47.938em) {
  #sidebar {
    width: 270px;/* changed from 230px*/
    left: -270px; }/* changed from 230px*/
```

→スマホ画面でうまくいかなかった．

ボックスは
nucleus.cssのなかのbox-sizingで定義されているのかな．
box-sizingは関係なさそう．


