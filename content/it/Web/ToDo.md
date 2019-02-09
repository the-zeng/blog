---
title: To Do　List
draft: true
---

変更したい点をメモとして残しています．
変更されたものはそのやり方をHugoの設定記事に書いていくつもりです．

- permalinkに執筆者名をgithubからとってきて入れたい

- 記事に投票ボタンをつけ，ポイント順に表示する

静的サイトだとどうしてもページへの動作（書き込み，クリック）などによってページへ影響を与えることが難しいです．
ですので，たとえばコメント欄をつくるにも外部サービスを使わなければいけないようです．

サイトのコンセプト的に使う外部サービスはgithubだけにしたいところです．

別記事でgithubの利用について書いています．



何かgithubを用いて投票を保存する方法があればいいのですが．

イメージとしては「各記事に対して強制的にissueを立ち上げ，そこへのレスポンスを取得する」みたいなのがいいかなと思っています．

issueはレポジトリ単位なのでファイルがつくられたcommitに対してコメントを作成する形がいいかも．

記事は全てmergeコミットの形であげていくのも手．
Squash and mergeを選べば，あまり見せる必要もない記事の編集過程を隠せ，authorもはっきりする．

mergeコミットへのコメントをコメント欄に表示する形？

- h3,h4タグそれぞれのデザインの変更
下線がつくやつとかボックスタイプが欲しい．
Qiitaに合わせたい．

- Netlifyに独自ドメインを設定



## h1 h2 タグなどのデザインの変更
/static/scss/original/main.scss
で設定されているようです．
→最終的にはstyle.cssなど．

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
箇条書きの要素．
un ordered labelだっけ．

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



- 画像の保存方法

SVGがよさげだけど脆弱性，容量感は？
せいぜい100KB程度かな．githubの容量目安が1GBなのでそのうち半分を画像にあてるとすると500MBなので5000枚です．
これを越えてくるなら違うサイトへの移植，もしくはプロジェクトの分化を考えるべきかな．

SVGの脆弱性は？
SVGではscriptを実行できるため，たとえば悪意のある人が編集したsvgをmergeしてしまうと，有害なリンクに移行するなどが可能になります．

SVGのスクリプトを禁止する方法もたぶんあります．
