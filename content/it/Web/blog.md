---
title: Hugoテーマの設定
---

## はじめに
このブログではHugoのテーマ「DocDock」をベースにしています．

最初はLearnを使っていましたが，サイドバーの下層への移動がスムーズでなかったのでこちらにしました．



## テーマを選ぶうえで気にしたこと
- 日本語の表示がそこそこきれい
- フォルダの構造でサイトの構造を決められる
- メニューバーがみやすい
- codeを表示してくれる

辺りです．


## 設定する場所

### config.toml
これはどのテーマを使うときも共通ですが，config.tomlに「このテーマを使うよ」ということを指定しなければいけません．
該当テーマのフォルダ中にあるconfig.tomlをコピーして，
themesdir = "../.."
をコメントアウトすればよいです．

To Do:
authorをファイル作成した人のgithubアカウントを自動的につけたい．

### アイコンの設定
layouts/partials/logo.htmlでメニューバー上のロゴを設定しています．

layouts/partials/header.htmlをいじり，さきほどのlogo.htmlが参照されるようにしています．

SVGが軽いのでInkscapeでつくりました．

### トップページ
デフォルトで「Custom Your Own Homepage」と表示されるページです．
これはlayouts/index.htmlが表示された結果です．
staticの中にindex.htmlをつくればそれが動くようです．

要するにcontentディレクトリ（.Site.Home）に何かmarkdownファイルがあればそれが読み込まれます．
_index.mdをつくればそれが表示されます．

### Code ハイライトの改善
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



### faviconの設定
ブラウザーのタブ部分に表示されるマークです．
設定しとけば少しプロ感が出ます．

/static/images/favicon.pngが読み込まれる設定になっているのでロゴをこのファイル名にすればOKです．

### menuバー下方への広告掲載
いずれは広告でも貼ろうかと考えています．
layouts/partials/menu-footer.htmlを編集すればよいです．


## ページの階層構造
記事に入れるメタデータは"title"だけにします．
```yaml
---
title: テーマの設定
---
```
のように，メタデータはYAMLという方式でいれていきます．

このmarkdownファイル群がページの基礎となりますが，Learn，DocDockでは各階層に説明ページをつけることができます．

説明ページは_index.mdという名前にします．これはテーマ独自のものであり汎用性はありませんが，書き込むことはそれほど多くないのでつくっておくのがいいかと思います．

## 画像を管理する場所．
画像リンクのリンク切れが一番こわいです．
最もシンプルな対策はすべての記事をmarkdownファイルでなくmarkdownファイルを含む **フォルダ**で管理し，画像はすべて同じフォルダ内にいれるという方式です．

他にも全体からすぐに参照できるimageフォルダに入れておくのも手ですが，膨らみすぎるとめんどうになりそうです．



## 色などの変更
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

## permalinkの設定
デフォルトではフォルダーの階層構造のよる名前がついていますが，たとえばリンクを貼るときなどはもっと完結にいきたいです．

slugを使うのが一般的ですが，これを設定するのは手間なのでファイル名をslug代わりにします．
「ファイル名に日本語入れない」などはある程度自然なルールなので対応しやすいかと思います．

Hugo公式ではpostsフォルダ以下にあるファイルに対してurlを設定するためには
config.tomlに
```toml
[permalinks]
posts = "/:filename/"
```
と書けばよいらしいですが，私は全記事に対して設定したいので
```toml
content = "/:filename/"
```
と設定してみました．が，うまくいきませんでした．

解決策として，記事用に新しいセクションを1つつくってみます．

categoriesというフォルダをつくりその下に今までのフォルダをすべていれ，
```toml
categories = "/:filename/"
```
とするとうまくいきました．
contentフォルダは少し他とは扱いが異なるようですね．

ちなみにurlを各記事ごとに設定したい場合はFront Matterで書き換えることができます．
```yaml
url: /Todo
```
とすると，狙い通り
baseURL/Todo
とできました．

### *追記: フォルダー名について
permalinkに設定するフォルダー名に大文字が入っていると私の環境ではうまく設定してくれませんでした．

フォルダー名は少しかっこ悪いですが小文字onlyにするのがよさそうですね．

表示されるのは_index.htmlに記したtitleなのでホームページの見た目には関係してこないです．

content/category/ITにするのが階層増えていやなのでcontent/ITにしようとしたときに気づきました．

ちなみにこうすると大カテゴリーごとにpermalinkを設定する必要がありますがまぁ一生でつくる大カテゴリーはせいぜい10個程度だと思うのでがまんします．

## navigation markがついてくるように
Homepage > Information technology
みたいなやつをbreadcrumb（bootstrapの一つ）というらしいです．
layouts/partials/body-beforecontent.htmlで設定されているようです．

topbarに含まれるので，
```css
#top-bar {
  position: fixed; /*add to fix top bar*/
  z-index: 100;
  width: 60%;
  min-width: 300px;

  background: #f7f7f7;
  border-radius: 2px;
  margin: 0rem -1rem 2rem;
  padding: 0 1rem;
  height: 0;
  min-height: 3rem; }
```
とfixedにしてあげればよいです．
コードハイライトと重なったときに，コードが前面にきてしまったので，z-indexも大きく設定しています．

相場を知らないので100にしました．

widthも設定しておきたいのですが，メニューバーを含めた幅を基準に%が決まってしまいます．
よって，メニューバーが出てきた状態と出てない状態で場合わけしたいので，出てきていない状態（画面幅で出るか出ないか制御している）では下記のようにwidthを上書きします．

```css
  @media only all and (max-width: 47.938em) {
    #top-bar {
      width:90%;
    }
  }
```



ただ，このままではページがよけてくれないので，全体をしたに下げる必要がでてきます．
body全体を下げるとtop-barまでさがってしまうので，文章部分だけを下げます．
デベロッパーツールなどを使い，文章部分のidがbody-innerだと見つけます．

```css
#body-inner {
  margin-top: 5rem;
  margin-bottom: 5rem; }
```

これで下がりました．




