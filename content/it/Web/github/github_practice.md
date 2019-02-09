---
title: github練習
draft: true
---

git, githubについて，以下のことがスラスラとできるようになりたいです．

- 新しいレポジトリの立ち上げ
- 既存レポジトリの手元へのダウンロード
- 自演プルリクエスト
- 自演プルリクエストへの応答
- fetchやrebaseの扱い
- 事故ったときの処理

## プルリクエストの種類
PRは2種類あるようです．

- fork pull model
- shared repository model

このうち，fork pull modelがいわゆるOSSで使われるPRです．

オリジナルと同じレポジトリで作業するかコピーの上で作業するかが異なります．普通OSSではオリジナルへのpush権限はないのでコピーをつくるのが必然となります．

簡単にできるのは2つめのshared repository modelなのでまずはこちらから試していきます．

まず，手元でbranchを切ります．
そして，このbranchを同じ名前でremote(github上のレポジトリ)にpushします．

そうすると，remote上に新たなbranchがつくられ，そこにpull requestボタンがあらわれます．

これを押せば，管理者にボールが投げられます．

管理者としては，よいPRだったらmergeしますが，このとき3つほど選択肢があります．
- merge and squash

## PR成功後の処理
さぁPRが成功しました．
リモートのbranchは消されることがほとんですが，何もしないとlocalにbranchが残ります．

とりあえずこれは残しといて
```sh
git checkout master
```
で古くなったbranchを抜け出します．

## git fetchの役割
データをとってきて，gitにorigin(リモート)masterの現状を報告するようなものです．
→この状態はどこで確認できる？
localにorigin/masterというbranchがつくられるらしいです．
特殊なbranchなのでgit branchなどでみることはできません．

これにおいつくには
master(local)が追いつくにはここから
- git merge origin/master
- git rebase origin/master
などを打てばよいです．

`git pull`でまとめて行えます．


## rebase mergeの違い

http://www-creators.com/archives/1943
が分かりやすかったです．

これらが効いてくるのはmaster branchに脇のbranchをmergeするときです．

基本的にmasterへmergeするとき（脇→master）に競合が発生するのは品がないです．

ですので，最新のmasterを脇に一度mergeして，競合は脇のほうで解決しておきます．
このときの解決するコンセプトがrebaseとmergeで違うようです．

イメージとしては

rebase: とりあえずmasterが正解．それに自分のcommitを競合を解決しながら追加していく．

merge: とりあえず自分のcommitありき．masterを追加していき，競合があれば解決．

みたいな感じですかね．
どっちがやりやすいかはmasterと競合したことないのでわからないです．

## git reset系の取り扱い
git reset --hard ID

## 自分のレポジトリをforkする方法
githubでは基本的に自分のレポジトリをforkするということはできません．
forkボタンがグレーアウトしています．

レポジトリに対してimport codeでimportするという方法があります．

## 未完成のものを1部分だけpull requestすることはできるか？

## localにはどのブランチの情報が保存される？

## git add, git commitしないままbranchを移動したときの扱い