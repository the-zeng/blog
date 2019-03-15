---
title: Use Hugo with github
draft: true
---

markdownファイルにtitle以外の情報を書き込むのは面倒くさいですし，移植性が低くなりなんか嫌です．

githubを使って管理したいのは

- author情報
- 記事の人気度
- 記事へのコメント

あたりです．

Q github使って記事ごとに管理権限与えることはできる？

## merge commitの利用
これを実現するには **1つの記事を1つのmerge commitに対応させる**という戦略をとればいいと思われます．
このmerge commitに著者情報が含まれ，そこへのコメントをそのまま記事へのコメントとして扱い，最初のコメント（自動生成させる）への「いいね！」などを記事のポイントとして反映させるという手段がとれます．

Squash and mergeを選べば，あまり見せる必要もない記事の編集過程を隠せ，authorもはっきりします．

あとは，このmerge commitの情報をどのように取り出すかです．
ここで管理者がmergeをするタイミングでスクリプトが走ればよいのですが，このスクリプトの中身を考えます．

一番最初に思いつく課題はcommitのID(生成されたhash)をどのように取得するかです．
逆にIDさえわかればなんでもできる気がします．

イメージとしては
git mergeをうつのと同時にmaster branchのdata/IDlist.datみたいなファイルにIDを追加していくのがいいですかね．
git mergeを含めたスクリプトを書いておくといいかな．

ただこれでは記事ファイルとcommitIDがまだ対応していません．
commit IDに含まれる情報からうまいことできないか考えます．

すべてに記事に共通で含まれる情報はfile名ぐらいなのでcommitIDから追加したfile名を取り出すことができればいけそうです．

[github公式](https://developer.github.com/v3/repos/commits/)
をみますと，「編集したfileのリスト」がcommitに紐づけられているようです．

各記事を表示するhtml群のどこかに
1. 記事のファイル名を取得．
2. ファイル名に紐づいたcommit IDをIDlistから取得．
3. APIを使ってcommit IDからそこについたファーストコメント（自動生成）への評価，それ以降のコメントを表示．
4. ページからgithubに評価，コメントができるようにもしたい．

## 同一ファイル名への対策
これは対処法が二つあり，
- 同一ファイル名がつくられにくい命名規則を策定
- ファイルへ名前以外の性質の付与
があります．

一番簡単なのは命名規則の策定で，
タイトル_筆者.md
に設定するようにすれば，
- 自分で同じ名前のファイルを2つつくっちゃう．
- 誰かの名前を騙る
ことがない限り大丈夫です．


Q. githubへのAPIは静的サイトから自動的に走ってくれる？

## 参考サービス
コメント欄についてはutterancesというgithubのissuesをそのまま用いてしまうサービスがあり，個人開発ですがコンセプトはかなり良い気がします．

## ファイルがおいてあるurlがわかれば関連するコミットが取り出せるらしい

git log -- ${file to path}でcommit一覧が取り出せるため，最初のcommitをみればよい．
しかしこの場合，ファイルを移動させると作成者がファイルを移動させた人になってしまう．

https://int128.hatenablog.com/entry/2014/11/24/152105

に用例がのっている．

## fileの追跡
https://qiita.com/yukimura1227/items/fbb076db61a2e43a32e3
を参考にしました．

git mvでfileのディレクトリ変更をしていれば，

```sh
git log --follow ${new file name}
```
と--follow オプションをつけることで昔のcommit（fileをつくったときのcommit）からcommit履歴を辿れるらしいです．

git mvと他の修正を同時に行うとうまくできないことがあるらしいので，移動させたりファイル名を変更した場合は都度git commitをするのがよさそうです．

## apiをjavascriptで流すには？

https://qiita.com/Saayaman/items/5857859709b677e4da15
http://sekai.hateblo.jp/entry/2013/08/30/010246

https://int128.hatenablog.com/entry/2014/11/24/152105
ここらへんが使えるかな．
