---
title: C++ pointerについて
draft: true
---

「ポインタ」というのは，C言語でいやになることの一つだと思います．
「ポインタなんか使わなくてもコードは書ける」というのはそれはそうで，実際無理にポインタを使うとコードが読みづらくなったりします．

ただ，人の書いたコードを読むときや特に配列のソートをするときに少し頭に入れておいたほうが良い場面があるのでまとめておきます．

## ざっとした理解
おそらく「ポインタ」という単語がちょっとわかりづらく，個人的には「アドレス」と言われたほうがしっくりきます．

*という記号や&という記号などいろいろ出てきます．

```cpp
vector<int> V;
```
というvectorを定義しましょう．
これに0から9まで格納していきます．

```cpp
REP(i,10) V.push_back(i);
```
これをソートすることを考えます．
```cpp
sort(V.begin(),V.end());
```
この`.begin()`という操作も「イテレーター」というものを取得する操作で，このイテレーターというのもポインタみたいなものです．


これはvectorやarrayなどすべてのcontainerに対して実行できます．

## iteratorとpointerの違い


```cpp
void solve(){
    VI v1[3];
    REP(i,10) v1[0].PB(i);
    cout << v1[0][2] << endl;

    VI& pointer = v1[0];
    
    cout << pointer[2] << endl;
    pointer[2] = 5;
    auto iter = find(pointer.begin(),pointer.end(),3);
    cout << *iter << endl;

    cout << v1[0][2] << endl;
}
```