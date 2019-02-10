---
title: Domainについて
draft: true
---

wordpressで使っていたお名前.comでとったドメインをnetlifyに移管するときのメモです．
wordpressはさくらのレンタルサーバーで使っていました．

## ドメイン絡みの単語
まずはドメインで関係してくる単語をリストアップしてみます．

- DNS
- CNAME
- ALIAS
- Aレコード
- whois情報

## ネットの情報にアクセスするまで
このblogのHTMLファイルなどは全てnetlifyのサーバーのどこかに置いてあります．
blogにアクセスしようと思えばこのサーバーの住所（IPアドレス）を知る必要があります．

対して，ブラウザに表示されているのは
the-zeng.com

という名前（ドメイン名）です．

ドメイン名をIPアドレスに変換するのがDNS(Domain Name System)です．

the-zeng.comというドメイン名はお名前.comで購入しています．
お名前.comは「the-zeng.comの内容が見たい」というリクエストに対して，
「このDNSでIPアドレスを見つけてね」と
**DNSを指定**します．

the-zeng.comの場合はnetlifyのDNSが指定されており，このnetlifyのDNSがnetlifyサーバー上のこのblogを収納している場所を指し示してくれるのです．



## netlifyでの登録手順
このblogはさくらのレンタルサーバー上においたwordpressから移動させていますが，作業としては
- the-zeng.comがこのblogを示すようにnetlifyのDNSを設定してもらう．
- お名前.comでさくらのDNSでなくnetlifyのDNSを見るように設定する
という2つだけです．

wordpressについてですが，これはお名前.comを設定した時点でthe-zeng.comという名前ではアクセスできなくなります．

私の場合は一応
"the-zeng.sakuraweb.com"という新たな無料ドメインをさくらで取得し，このドメインがwordpressを指すようにしています．


## レコードの違い
- CNAME
- Aレコード
- ALIAS


