---
title: C++でソート
---
競技プログラミングでc++標準のsort関数を使ううえでのあれこれの備忘録です．
- 降順のソート
- 構造体を用いた多次元配列のソート
について書いていきます．

## 降順のソート
sort関数は
```cpp
sort(A,A+N)
```

のように書くと配列Aの[0]から[N-1]までを昇順にソートしてくれます．与えている引数は
- Aが格納されている場所の始まり
- 終わり

の2つです．
（Aがアドレスを指すのも最初は分かりづらいので解説）

ではこれを降順にソートするためにはどうすればよいでしょうか？

実はソート関数はさらに**比較関数**というものを設定できます．
降順に設定するためには，あらかじめ用意されている比較関数`greater<int>`を用いて
```cpp
sort(A,A+N,greater<int>)
```

と書けばよいです．

この比較関数，自作することもでき，多次元配列のソートでは比較関数を自作していきます．(自作といっても1行で済みます)


## 多次元配列のソート

`pair<int int>`などを使ってもできますが，汎用性を考えてここでは構造体(struct)を使って説明します．

## 構造体
template, struct, class, using, typedefみたいなC，C++独自のアルゴリズム関係ないところの呪文は私は「ゔっ！」となりやすいのですが，structは特にグラフを使う場合に必須になってくるのでがんばります．

シンプルなものから始めてアレルギーをなくすのがいいかと思います．
グラフを使うときにつくる**構造体**が，
```cpp
struct edge
{ 
    int from, to, cost;
};
```
です．これを使ってなにができるかを見ていきましょう．

標準入力から10本の向きがある辺（起点，終点，重さ）が与えられるケースを考えます．まず思いつくのは10×3次元の配列を用意し，
```cpp
int A[10][3];
REP(i,10) cin >> A[i][0] >> A[i][1] >> A[i][2];
```
といれていく方法です．これも悪くはなく，なにより要素に数字でアクセスできるのはアドです．

これをさきほどつくった構造体を用いて書いてみます．
```cpp
edge E[10];
REP(i,10) cin >> E[i].from >> E[i].to >> E[i].cost ;
```
このようにstructの中で定義した3つの変数`from, to, cost`にアクセスできます．

自分で設定した文字列で要素にアクセスするのが最初はちょっと気持ち悪いかもしれませんが，慣れると何にアクセスしているのかが一目でわかり気持ちいいです．

## 構造体のソート
structを構成してしまえば，多次元のソートの理解が容易になります．
構造体のソートのためには自作の比較関数を用いて
```cpp
sort(Edge,Edge+10,比較関数)
```
と書きます．

比較関数はどのようなものを用いればいいでしょうか？これは見て理解するほうが速いので例を貼ります．
```cpp
bool HikakuFunction(const edge& Hidari, const edge& Migi){return Hidari.cost < Migi.cost;}
```
なぜ`const`がいるのかとかなぜ`edge&`のように`&`をつけるのかなど細かい疑問は生じますが，sort関数がこの比較関数を
```cpp
HikakuFunction(左の辺，右の辺)
```
と呼び出し，そのあとの条件式がtrueだったらそのまま，falseだったら入れ替えるみたいなイメージはつかめるかと思います．

勘がよいみなさんは分かると思いますが，この条件式`{Hidari.cost < Migi.cost}`をたとえば`{Hidari.from > Migi.from}`に変更すると辺の起点のidを降順でソートするみたいにあとは自由自在です．
