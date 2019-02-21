---
title: c++メモリ管理
draft: true
---

segmentation faultをさせないために．

関数内ではデフォルトで確保できるメモリに限界があります．

そこで，競プロでは地の文で配列を定義することで，これを無理やり解決することが多いです．

本来は，ほしいメモリを都度分けてもらうのが適切です．

## vector型でのメモリ管理
pbのときに勝手に再アロケートしてくれる．