---
title: "stage branch method"
---

## 概要
master branchの変更をpull requestに限定する場合のワークフローの提案です．

昨日，pull requestを始めて使ってみたのですが，branchからbranchへのpull requestはbranch内での`git commit`と雰囲気が似ているなと感じました．

「では`git add`に対応するのは何なのか？」

と考えた時に，stageに相当するbranchをつくってあげればいいのではと思ったのがきっかけです．

ちなみにこの方法を使っているのはblog執筆であり，仕事によって向き不向きはあります．


## stage branchがあるとなにが嬉しいのか？
pull requestを送るときは1回につき1個のtopicが基本となるようです．
ですので，topicごとにbranchを切ります．

問題となるのは**複数のtopicを同時に扱うとき**です．
作業ごとにbranchを移動するのがどうも面倒臭いのです．

できれば，同一branch内で複数の作業を平行して進めていきたいです．
対してpull requestを送る時はtopic１つずつにしたほうが歴史がきれいになります．

そこにstage branchがあると，develop branchからtopic１つに相当するファイルだけ（blogだと1記事だけ）stage branchにコピー（stage）し，stage branchからmaster branchに整理されたpull requestを送ることができます．

## 実際のワークフロー
用意するbranchは

- master
- stage
- develop

の3つです．

ローカルのmasterは消してもOKです．（消した方がすっきりします）

執筆，コーディングは全てdevelopで済ませます．（review対応ぐらいならstageでやってもいいかも）

そして，masterへpull requestを送るのは**stage**からです．

少し考えるのはdevelopのファイルをstage branchにstageする方法です．
これは
```sh
git checkout develop -- ${path/to/file}
```
とcheckoutコマンドを使ってコピーしてきます．

stageに移動したあとに${path/to/file}をうつのは表示されていないので意外と骨が折れます．
小技ですが，
(develop) git checkout develop -- ${path/to/file}をしておくとターミナルの履歴に残ってくれます．
commit前にやると編集前（前のcommit）に戻ってしまうので気をつけてくださいね！

## pull requestを送るまでの流れ
pull requestを送るまでの流れを説明します．develop branchは最新のmaster branchの情報が全て取り込まれている状態であることを前提とします．(git pull origin master済)
```sh
(develop) git checkout stage
(stage) git checkout develop -- ${path/to/file}
(stage) git add .
(stage) git commit -m "message"
(stage) git push origin stage
(github上) pull request
```
となります．

## disadvantage
stage branchを使わない場合，
```sh
(develop) git push origin develop
(github上) pull request
```
で済みますので，複数の作業を平行して進めたいとき以外は手数が増えるだけです．

ほかに気になるとすれば，git checkout develop -- ${filename}によってファイルをコピーしてきたときに，**commit履歴はコピーされません**.

develop branchには残りますし，stage branchでもコピー後にcommitをするのでそこでメッセージは残せます．ただ，develop branchでの苦労の歴史をpull requestでmasterに見せたいときには向かないです．

## まとめ
以上がstage branch methodの概要です．


