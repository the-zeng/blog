---
title: githubによるblog執筆プロセス
draft: true
---

## 前提
blogを執筆するメンバー

- 自分1人
- 仲のよい数人(社内blogみたいな)
- オープン(Qiita的なサービス)

これらによって，使用するbranchの数，レポジトリの数が変わってくると思いますが，できるだけすべてに対応できる方法を考えていきたいと思います．

## 公開のタイミング
まずはゴールから考えていきましょう．

「master branchは常に公開されている」
という状態にしましょう．

では，masterにmergeするときのワークフローを考えます．

## 考えうるcommit
blog的なサービスをつくる上で考えられるcommitを次の3つに分けます．
- 機能自体の変更
- 記事の投稿
- 投稿した記事の編集

## 記事が完成するまで
記事を実際に書くときの流れを考えてみます．
1つの記事を一気に書き上げられる人もいるかもしれませんが，私はムリです．
いくつかの記事のファイルを複数開き，完成させられそうなところから徐々に完成させていくスタイルです．

さて，フローがみやすいのは，「1記事1branch」という制限だと思います．

しかし，この方法だといくつかの記事を同時平行で進めたいときにいちいち"gitcheckout"という操作が必要になります．

VScodeで編集しているのですが，できれば書きかけの記事は全て横のtabに現れてほしいです．
また，１つのPCだけで編集するとも限らないのでgitにpushしたいです．

まず思いつくのはdraft用のbranchを作成することです．

masterに執筆中の記事がdraftとして置いてあるのは許せる？
→できればmasterは完成状態だけにしたい．
ただ，あまり複雑になってもいけないのでdevelopブランチぐらいには．

### 手元での実験環境
Hugoを使う場合，
```yaml
draft: true
```
とFront Matterに書いておくと，/publicに出力されません．

そうは言ってもどのように現れるかをみたいときは
```sh
hugo server -D
```
と-Dオプションをつけるとdraftを含め表示してくれます．

## developとmasterを違うレポジトリにする？
気合いいれすぎな気がする．
全てプルリクで管理？
内部からのプルリクと外部からのプルリクは同等に扱える？

まずは自分の執筆から管理していってラクな方法を探していきたい．
自分のレポジトリだとforkできないから同一レポジトリ内でやるほうがいいな．

やはり完成させた記事からpull requestだしていきたい．

https://qiita.com/oret/items/b646fcada9d89ed308c4

```sh
git checkout <branch> -- <file>
```

で特定のファイルだけとってくることができるらしい．


pullrequestを小分けにできれば解決しそう．

## 特定ファイルのmergeは可能か？
`git checkout`をうまく使えばいけるらしいです．

```sh
git checkout ${branchname} -- ${path_to_file}
```
で対象branchの対象fileが現在のbranchにコピーされるというのです．

git checkoutはbranchの移動に使うコマンドであり，いまいるbranchの情報を変更するのはちょっと違和感を感じてしまいます．

git checkoutの使いかたをもう１つみてみます．

```sh
git checkout -- ${path_to_file}
```
これは，対象ファイルを最後のcommitの状態まで戻すという操作です．
ちなみに--をつけるのはfile名であることを明示的に指定するためらしいです．

この3つの使用例からなんとなく「HEADを移動させる」というgit checkoutの性格が掴めてきます．

HEADというのは現在目に見える状態です．
VScodeを開いていたら，表示されているフォルダ，ファイルです．

checkoutでファイルを指定するのは
「HEAD（すなわち現在いる場所）にファイルをコピーしてくる」という操作に相当します．

branchを変えずにcheckoutするというのは，少しトリッキーですが，
「完成した部分からプルリクをする」というワークフローが可能になります．

## 最終的なワークフロー
用意するbranchは
- master
- stage
- develop
の3つです．

よくあるワークフローは
- master
- develop
の2つですが，間にstageをいれるのは
「やりたいこと全部はやってないけどここまでは使える！！」
という状態に対処するためです．

- 複数のtopicを同時進行する
- branchの移動はめんどうくさい
という場合に使います．

イメージとしてはgit add ${filename}
を
```sh
(stage branch) git checkout develop -- ${filename}
```
git commitを
masterへのpull requestとしているような感じです．

要するに，stage branchはgit addでcommitの対象にする変更をのせるstageのような役割を果たします． 

## pullrequestまでのコマンド比較
通常
(develop) pull request

このワークフロー
(develop) git checkout stage
(stage) git checkout develop -- $(filename)
(stage) pull request

stageに移動したあとに${filename}をうつのは表示されていないので意外と骨が折れます．
小技ですが，
(develop) git checkout develop -- ${filename}をしておくとターミナルの履歴に残ってくれます．
commit前にやると前のcommitの状態に戻ってしまうので気をつけてくださいね！

## disadvantage
この手法で1点気にしないといけないのは，git checkout develop -- ${filename}によってファイルをコピーしてきたときに，**commit履歴はコピーされない**ということです．

develop branchには残りますし，stage branchでもコピー後にcommitをするのでそこでメッセージは残せます．ただ，develop branchでの苦労の歴史をpull requestでmasterに見せたいときには向かないです．

## master branchはリモートにあるだけでよい
git fetchでリモートの origin/masterの情報をとってこれます．
git fetchしたあとにrebaseなりmergeなりすればよいです．(git pullでもよい？)


git clone -b ${branch} https://リポジトリのアドレス
で特定のbranchを直接cloneできるようです．

git branch -D master でmaster branchを消しちゃってもOKです．



## どうやってリモートの操作をターミナルからする？



