---
title: 静的サイトのコメント欄
draft: false
---

このサイトはHugoという**静的サイトジェネレーター**というものを使用しています．

**静的サイト**とは，ひらたく言うと「文章(HTMLファイル)を体裁を整えて置いてあるだけのサイト」です．この説明だけですと，「ほとんどのwebサイトはそうじゃないの？」と思われるかもしれません．

動的なサイトとの違いでもっともわかりやすいのは「コメント欄」です．

コメント欄をつくるには，

1. サイトを見た人がコメントを書き込む
2. コメントをサーバーのどこかに保存する

のように，閲覧者の行動によってサイト自体を変化させなければいけません．

この「サイトを変化させる」というのが静的サイトではできない点であり，考え方をかえると変化させられないことでセキュリティが高くなっています．

## でもやっぱりコメント欄欲しい！
ブログの大半の機能は静的サイトで十分です．しかし，コメント欄や評価ボタンは欲しくなることがけっこうあります．

静的サイトの場合，どうやってこれらを実現するのでしょうか？

結論からいうと，静的サイトだけでは難しいので外部のサービスを使います．

わかりやすいのはFacebookのいいねボタンのリンクを貼っておいて，ボタンがクリックされるといいねが増えるというイメージです．このとき「いいね！を押した」という情報がどこかに保存されなければいけませんが，静的サイトでは難しいので，Facebook社のサーバーに情報を保存してもらうのです．

コメント欄も同様に外部のサーバーに保存させてもらいます．静的サイト界隈ですと，Disqusというサービスが有名なようです．

## Github使えたらいいなぁ
外部サービスはいくつかありますが，blog自体をgithubで管理しているので，できればコメント欄もgithubを使えたらいいです．

おそらくAPIを使えばissuesを各ページに表示することはできますが，課題となるのはAPIの実行回数制限です．ページを表示するたびにAPIが叩かれるようになっているとさすがにいつか限界がくる気がします．

まだ私も良い解がないので，コメント欄をサイト内に貼り付けるよい方法を知っている人がいればコメントしてほしいです．

## まとめ
「外部サービスを使う」というのが，静的サイトへのコメント欄実装の基本でした．

まとめとして，私が考える最もシンプルなコメントの受付方法を実装します．

[コメントはこちら](https://github.com/the-zeng/blog/issues/5)

## 知りたい情報
- 静的サイトからgithubAPIを認証ありで叩く安全な方法
- githubのissuesのページ自体を埋め込むアプローチは可能か？
    - できればAPIを叩かずにiframe要素として埋め込みたい．