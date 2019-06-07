---
title: BFSとDFS
---

全探索のアルゴリズムについてです．
使いどころとしては，
- グリッド上
- グラフ上

精神としては，BFSがFirst in, first outなのに対して，DFSがlast in, first outです．
BFSは最短経路問題とも関連してきます．

BFSはダイクストラ法の特殊な状況（辺の重みがすべて1）とも捉えることができる？

# ダイクストラ

# BFS
抽象的なプログラム
priority_queにidを保存させた構造を突っ込めるか？
sortと同じように比較関数を指定してあげればよい．
参考https://www.albow.net/entry/pqmycls

```cpp
struct IdCost{
    int id
    int cost
}

// 比較演算子のオーバーロード
bool operator< (const IdCost &idcost1, const IdCost &idcost2){
    return student1.Cost < student2.Cost;
};

```

```cpp
void dijkstra(int start){ // vertex.id
    // initialize vertex level(cost)
    REP(i,N){
        vertex.cost = -1;
    }
    V[start].cost = 0;

    que.push()
}

```



```cpp
void bfs(int s){
    memset(level, -1, sizeof(level)); // -1で初期化
    queue<int> que;
    level[s]=0;
    que.push(s);
    while (!que.empty()){
        int v = que.front(); que.pop();
        REP(i, G[v].size()){
            edge &e = G[v][i];
            if (e.cap > 0 && level[e.to] < 0){
                level[e.to] = level[v] + 1;
                que.push(e.to);
            }
        }
    }
}
```


木構造の直径を求めることを考えます．
データは辺で保持

まずは抽象的なプログラムを書きます．

[ATC001](https://atcoder.jp/contests/atc001/tasks/dfs_a)の解説が分かりやすいです．

- スタックを用いた方法
- 再帰関数を用いた方法

がありますが，スタックを用いた方法のほうが好きです．
スタックを用いていればdinic法などの高度なアルゴリズムにも応用が利きます．

int dfs(int v, int t, int f){
    if (v==t) return f;

    for (int &i = iter[v]; i < G[v].size() ; i++){
        // &iは参照渡しかな
        edge &e = G[v][i];

        if (e.cap > 0 && level[v] < level[e.to]){
            //do not search for the edge which goes back
            
            int d = dfs(e.to, t, min(f, e.cap));
            if(d > 0){
                e.cap -= d;
                G[e.to][e.rev].cap += d;
                return d;
                //DPRINT(e.to)
            }
        }
    }
    return 0;
}