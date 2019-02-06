---
title: テンプレート.cpp
---
競技プログラミングでc++のコーディングをするとき`#include <iostream>`などをいちいち書くのは大変なので，共通する部分はテンプレート化して持っている人が多いです．

あらかじめたくさん書いておくのはずるい気もしますが，ルール上全く問題ないのでがんがんやっていきます．

ではどのようなテンプレートがよいのでしょうか？？

こればかりは信仰によるので好きな人のものを真似するのがよいかと思います．
私は競プロ始めたときにコンテスト上位に知り合いがいたのでその人のテンプレートをベースにコンテストで正当例をみながらよさげなものがあったらコピペしています．


Atcoderにしか出ない場合いらない部分が多いと思いますが，Google Code Jamみたいに違うコンテストにでるときに違うテンプレを使うのが面倒なのである程度共通して使えるものを意識しています．

たとえばAtCoderだけならint main{}の中に書けばいいですが，複数のサンプルを一つのコードで処理させるコンテストもあるのでサンプルのたびにvoid solve{}を呼び出すようにしています．AtCoderでは1回しか呼び出しません．

# includeするもの
先人たちがよくincludeするものを片っ端からincludeしています．
`#include <bits/stdc++.h>`でもいいのでしょうがここは宗教上の理由です．

# 省略系
先人たちが使ってるのをみて真似していれてみましたが，実際に使いこなせているのはREP,pb,chmin,chmaxぐらいです．

本当は大文字小文字とかも統一したほうがいいですね．

# デバッグ用のあれこれ
error出力を使う人もいますが，なんとなく「絶対に出力しないぞ」という気持ちが欲しいので，デバッグ用の関数を`#ifdef DEB`の中にいれて，提出時に`//#define DEB`を無効化することで対応しています．
提出時に無効化し忘れるリスクがありますが，毎回やってると大丈夫です．

テストケースの検証ですが，かなり古典的に入力例をinput.txtにコピペし，デバッグのときはinput.txtから入力が来るようにしています．

多少手間ですがいろいろ入力を試したいときにやりやすいです．DPRINT関数は表示したい値を表示する用，DCEHCKは「ここまでたどりついた」などのメッセージを表示する用です．

# 入出力
`cin` や`cout`は遅いという話もみますが，まだそこを気にするレベルには達していないのでビジュアル的におとなしいこちらを使っています．

 `scanf("%d%d",&h,&w)`みたいに記号が並んでいるとそれだけで脳にダメージを受けるので．

# 実際に使っているもの
先人たちのコードを眺めながら現状この形に落ち着いています．
作法など気にしていないときにつくってそれで慣れてしまったので作法がバラバラになっています．


```cpp
#define DEB1 //output check function
#define DEB2 //input from input.txt

//#include <bits/stdc++.h>でもよい．なんとなく1つずつ．
#include <iostream>
#include <algorithm>
#include <string>
#include <fstream>
#include <vector>
#include <cstdio>
#include <cmath>
#include <queue>
#include <stack>
#include <cmath>
#include <cstdlib>
#include <cstring>
#include <string>
#include <set>
#include <map>
#include <thread>
#include <mutex>
#include <iomanip> //有効数字指定するときに使う．昔入れてなかった．

//打つのを省略するため．実際使うのはREP, pb, chmax, chminとか．
#define ZERO(a) memset(a, 0, sizeof(a))
#define MINUS(a) memset(a, 0xff, sizeof(a))
#define INF(a) memset(a, 0x3f, sizeof(a))
#define ALL(t) (t).begin(),(t).end()
#define FILL(a,c) fill(a, a+ sizeof(a)/sizeof(*a),c)
#define FILL2D(A,c) fill(A[0], A[0] +sizeof(A)/sizeof(**A),c)
#define FILL3D(A,c) fill(A[0][0], A[0][0] +sizeof(A)/sizeof(***A),c)
#define REP(i,m) for(int i=0;i<(m);++i)
#define REPN(i,m,in) for(int i=(in);i<(m);++i)
#define IN(a, x, b) (a<=x && x<b)
#define chmax(x,y) (x = max(x,y))
#define chmin(x,y) (x = min(x,y))
#define pb push_back

using namespace std;

// 型を宣言するときにうつのを省略する系
using ll = long long;
using PAIR = pair<int, int>;
using PAIRLL = pair<ll,ll>;
using vi = vector<int>;
using vvi = vector<vi>;



// DEB1が有効になっているときだけ出力される．error出力を使えばいいじゃんという考え方もある．
#ifdef DEB1
#define DPRINT(x) cout<< #x << "=" << (x) << endl; // print at debug mode
#else
#define DPRINT(x) ;
#endif
#ifdef DEB1
#define DCHECK(x) cout<< "debug check" << #x << endl;
#else
#define DCHECK(x) ;
#endif
 


/*
constant values
*/
const int NM = 101001; //ここを問題の制約を見ながらいじる．配列の確保に使う．

int A[NM];　//あまり褒められたことではないが関数の外側に配列を確保すると怒られにくい．


// Main program
void solve(){
    cin >> N ;
    int ans;
    cout >> ans >> endl;
}



// ----------------------------------------------
int main() {

// 一番上の#define DEB2を有効にしていると，input.txtから標準入力を読み込む
#ifdef DEB2
    cout << "DEBUG MODE"  << endl;
	ifstream in("input.txt"); //for debug
	cin.rdbuf(in.rdbuf()); //for debug
#endif

	int T=1; 
    // Atcoderは親切だが，Google code jamとかだとテストケースの数Tを読み込まないといけなかったりする．
	for (int i = 0; i < T; ++i) {
		solve();
	}
}
```
以上になります．
「これも#defineしとけ」や「そのやりかたは危ないぞ」などご教示いただけると幸です．