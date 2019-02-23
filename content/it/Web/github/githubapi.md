---
title: git apiを使うための編集
draft: true
---

参考：
https://handywebdesign.net/2017/09/jquery-for-beginner/

http://yonaba.github.io/2012/08/14/List-your-GitHub-projects-using-JavaScript-and-jQuery.md.html

themesの中でoriginal/head.htmlでjQueryは読み込んである．

## jsスクリプトの追加
custom_head.htmlで
/static/js/usegitapi.jsを読み込むようにする．

## 
layouts/partials/original/body_beforecontents.htmlに
```html
<div id="github-author"></div>
```
を追加．
最終的にここにgithubから取り出したauthor情報が入ってくることを目指します．

https://pandanote.info/?p=3389
アクセス制限があるため，一度自サーバーに内容をキャッシュしている．

前提
- 何回もアクセスするのは筋が悪い
- 静的サイトゆえサーバーでいろいろするのは難しい

最終構想
- 執筆者情報やgithub関連の情報を蓄えておくファイルを作成（古典的データベース）
- blogのbuild前にファイルをいじるプログラムが走る．
- それぞれのページはファイルから情報を持ってくる．（ここにgithubapi使う）

静的サイトでがんばる話
https://www.altus5.co.jp/blog/static-site/2016/12/18/static-site-free-plan/

