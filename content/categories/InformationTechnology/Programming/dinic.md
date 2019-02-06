---
title: dinic法の気持ち
---
まずはアルゴリズム全体の流れです．
最小カット問題自体の気持ちについてはAtCoder公式の解説をはじめとしていろいろあります．

最大流と最小カットは等しいので，最小カットを求める問題は最大流を求める問題に帰着できます．

公式解説であげられているのはFord-Fulkursonのアルゴリズムですが，Dinic法とコンセプトは似ています．

## Ford-Fulkursonと共通するコンセプト

まずは水を流せるところに流して，流した分経路の容量を減らします．
しかしこれだけだと最適な流れになるかは保障できないので，「水を流したら流した分，逆向きの容量が生じる」という捉え方をします．
「一度最適でない経路に水を流してしまっても，逆向きに流した水によってなかったことにできる」みたいな気持ちです．

## Dinic法のポイント

スピードに効いてくるのは水を流せる経路の探索です．
Dinic法では

1. 幅優先探索で水を流す向きをざっと決める．
2. 深さ優先探索で決められた向きで流せる経路を探し，水を流す．
3. 流せなくなったら1に戻る.

のようなイメージです．


コードを貼り，各部分について説明していくというスタンスでいきます．基本的に蟻本のコードの写経になります．
```cpp
// 配列や構造の定義
struct edge {int to, cap, rev;};

vector<edge> G[MV]; //メインのグラフ
int level[MV];　//BFSで使う
int iter[MV];　//DFSで使う

//add edge of cap which "from -> to"
void add_edge(int from, int to, int cap){
    G[from].pb((edge){to, cap, G[to].size()});
    G[to].pb((edge){from, 0, G[from].size() -1 });
}

//calculate min Distance from start with BFS
void bfs(int s){
    memset(level, -1, sizeof(level));
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

//find path with DFS
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

int max_flow(int s, int t){
    int flow = 0;
    for (;;){ //repeat eternally

        bfs(s); // edit "level"
        
        if (level[t] < 0) return flow; // no route exist(finshed) 
        memset(iter, 0, sizeof(iter)); //initiate iter[]
        int f;
        while ((f = dfs(s,t,INF)) > 0 ){
            flow += f;
        }
    }
}
```


## step1
 まず，水を流す向きを決めてしまいます．スタートに近いところから遠いところに向かって流しますが，この近さをlevelという配列に保存しています．
levelを求めるのにBFSを使います．
「これでは遠回りな経路が探索できないじゃん」と思いますが，あとで解決します．

## step2
1で決めた順番にしたがってDFSによってゴールにたどりつく経路を探します．たどりついては水を流しまた探索を繰り返します．順番を決めたことでここの探索が効率化されます．
DFSの中にiterという配列があり，何をしているのか最初は戸惑いますが，「ノードvから出る辺についてはここまで探索済みだよー」という情報が管理されています．

この情報はiter[v]に保存されていますが，コードは少し慣れない書き方がされています．
```
(int &i = iter[v]; i < G[v].size() ; i++)
```
私の理解が正しければこれは参照渡しというものをしており，iをiter[v]と同じものとして宣言しています．
何が起こるかというと，i++が実行されるときにiter[v]++も同時に実行されるようになります．



参考：
[https://www.s-cradle.com/developer/sophiaframework/tutorial/Cpp/reference.html](https://www.s-cradle.com/developer/sophiaframework/tutorial/Cpp/reference.html)

探索の効率化についてはこちらが詳しいです．


参考：[http://topcoder.g.hatena.ne.jp/Mi_Sawa/20140311/1394730336](http://topcoder.g.hatena.ne.jp/Mi_Sawa/20140311/1394730336
)


## Step3
再びBFSで水を流す向きを決めます．さきほどは遠回りになっていて対象にならなかったルートもstep2で近道は全部枯らしたので対象になります．

これをスタートからゴールにたどりつけなくなるまで続けます．

これで最大流を求めることができます．

# まとめ
dinic法の中身について書いてきましたが，正直なところdinic法を使うときはライブラリ的な使いかたが多く，コードの中身はあまり気にしません．

グラフのカット問題は「dinic法のコードを書く力」よりも，「dinic法のコードにつっこめば正解が得られるように問題文を変形する力」のほうが求められることが多いからです．

無向辺を両方向の有向辺に変換するだとか，都合が良いように別のノードを付け足すとかの問題に応じた技術が必要になります．

ここら辺はたくさん解いて精進していきたいです．