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
