---
title: Hugoテーマの設定
author: the_zeng
---

## はじめに
このブログではHugoのテーマ「DocDock」をベースにしています．

最初はLearnを使っていましたが，サイドバーの下層への移動がスムーズでなかったのでこちらにしました．



### テーマを選ぶうえで気にしたこと
- 日本語の表示がそこそこきれい
- フォルダの構造でサイトの構造を決められる
- メニューバーがみやすい
- codeを表示してくれる

辺りです．


### 設定する場所

#### config.toml
これはどのテーマを使うときも共通ですが，config.tomlに「このテーマを使うよ」ということを指定しなければいけません．
該当テーマのフォルダ中にあるconfig.tomlをコピーして，
themesdir = "../.."
をコメントアウトすればよいです．

各記事のパーマリンクは，サイト構造を変えるときの影響を減らしたいのと英語にしたいので
/:author/:filename/
にします．
（To Do: うまく変更されない）

To Do:
authorをファイル作成した人のgithubアカウントを自動的につけたい．

#### アイコンの設定
layouts/partials/logo.htmlでメニューバー上のロゴを設定しています．

layouts/partials/header.htmlをいじり，さきほどのlogo.htmlが参照されるようにしています．

SVGが軽いのでInkscapeでつくりました．

#### トップページ
デフォルトで「Custom Your Own Homepage」と表示されるページです．
これはlayouts/index.htmlが表示された結果です．
staticの中にindex.htmlをつくればそれが動くようです．

要するにcontentディレクトリ（.Site.Home）に何かmarkdownファイルがあればそれが読み込まれます．
_index.mdをつくればそれが表示されます．

#### Code ハイライトの改善
デフォルトだと変な枠が出てきてうっとうしいです．

Hugoの機能でChromaというものを使ってCodeをハイライトしてくれます．


```toml
pygmentsCodeFences = true
pygmentsUseClasses = true
```

をconfig.tomlに書き込んだうえで，

- style.cssを作成
- head.htmlで読み込む

ことによってactivateされました．
使うときは
"```python"のように言語の名前をつけて使います．



#### faviconの設定
ブラウザーのタブ部分に表示されるマークです．
設定しとけば少しプロ感が出ます．

/static/images/favicon.pngが読み込まれる設定になっているのでロゴをこのファイル名にすればOKです．

#### menuバー下方への広告掲載
いずれは広告でも貼ろうかと考えています．
layouts/partials/menu-footer.htmlを編集すればよいです．


### ページの階層構造
記事に入れるメタデータは"title"だけにします．
```
---
title: テーマの設定
---
```
のように，メタデータはYAMLという方式でいれていきます．

このmarkdownファイル群がページの基礎となりますが，Learn，DocDockでは各階層に説明ページをつけることができます．

説明ページは_index.mdという名前にします．これはテーマ独自のものであり汎用性はありませんが，書き込むことはそれほど多くないのでつくっておくのがいいかと思います．

### 画像を管理する場所．
画像リンクのリンク切れが一番こわいです．
最もシンプルな対策はすべての記事をmarkdownファイルでなくmarkdownファイルを含む **フォルダ**で管理し，画像はすべて同じフォルダ内にいれるという方式です．

他にも全体からすぐに参照できるimageフォルダに入れておくのも手ですが，膨らみすぎるとめんどうになりそうです．



#### 色などの変更
static/them-original/variant-blue.css
のようになっていて，optionによってどこが読み込まれるかが変わります．

/layouts/original/head.html
で諸々を読み込んでいます．

```html
<link href="{{"theme-original/style.css" | relURL}}" rel="stylesheet">
{{with .Site.Params.themeVariant}}
  <link href="{{(printf "theme-original/variant-%s.css" .) | relURL}}" rel="stylesheet">
{{end}}
```
のようにスイッチさせているようです．

custom-head.htmlから自作のvariant-zen.cssみたいなのを読み込めば設定が上書きされるので色を自由に操れます．

ただ，メニューバーで選択したときに白くなりますがこの色は別の場所で定義されているようでvariant.cssを上書きするだけでは変えられませんでした．



## To Do
- 記事のリコメンド機能
(upとdownをつけたい)

- ポイント順に表示する機能

http://klutche.org/archives/1741/
ここら辺が参考になりそう．
Ajaxを使う．


- parmalinkの設定


