# Next.jsにおけるページ表示について

## SG(静的生成)とSSG(サーバーサイドレンダリング)
それぞれデータを取得するタイミングが異なる

### SG(Static Generation: 静的生成)
- ビルド時に必要なデータを取得してページをプリレンダリング
- データの更新はできない
- ビルド時にでページを生成するため、ビルドに時間がかかるが、プリレンダリング済のものを返すだけなのでリクエストに対する表示は爆速

### SSR(Server Side Rendering)
- リクエストされた際にデータを取得してそれをもとにプリレンダリグ
- 常に最新のデータでページが構成される
- ビルドの時間は必要ないが、リクエスト毎に全ての処理が行われるため、SGより表示は遅い

## プリレンダリングのタイミング
### SSR
ページのリクエスト時
### SG
ビルドを実行した時
### fallback
最初にページがリクエストされた時
### ISR(Incremental Static Regeneration)
指定時間経過したあとにページがリクエストされた時
### On-demand ISR(On-demand Revalidation)
レスポンスヘルパーである`unstable_revalidate`関数が実行されたタイミング


## getStaticPropsとgetServerSidePropsについて
Next.jsでSGやSSRを実現するには、ページコンポーネントと合わせて`getStaticProps`や`getServerSideProps`をエクスポートする。

- `getStaticProps`: SG
- `getServerSideProps`: SSR

## getStaticPathsについて
`getStaticPaths`は`getStaticProps`とセットで使うために用意された関数
`getStaticPaths`の中に、Dynamic Routesから渡されるオブジェクトと同様のものを用意しておくと、ビルドの際にcontextを通じて`getStaticProps`に渡されてプリレンダリングが行われる。
slug（`[slug].js`）を利用したダイナミックルーティング時に使われる。

```
export async fundtion getStaticPaths() {
  return {
    paths: [{ parms: {slug: 'page1'} },{ params: {slug: 'page2'} }],
    fallback: false
  }
}

export async function getStaticProps(context) {
  //
}
```

`fallback`は`paths`にないURLに対する処理を指定する。falseの場合ページはないものとして404エラーを返し、trueの場合はデータがない状態でページを表示し、バックグラウンドでデータを取得後にJSONを作成、クライアントへ送信しページを完成させる。blockingの場合、プリレンダリングを済ませてからページを送る処理となる。

## ISRの設定
ISRの設定は`getStaticProps`で行う。返り値オブジェクトの中で`revalidate`を使って時間を指定する。指定した時間が経ったあとのリクエストでプリレンダリングが行われ、ページが更新される。fallbackとは無関係に設定できる。

# どのような方法でどのようにサイトを構成するか？

Next.jsではSG,SSRどちらでもサイト構築が可能であるが、基本的にはSG側に`getstaticPaths`の設定があるだけである。そのため、基本的なJumstack構成でSGで作成するのが王道。

## Jamstackとは
Jamstackとは、Javascript, API, プリレンダリングされたMarkup(HTML)で構成されたサイトやアプリを作成するモダンなアーキテクチャ。

