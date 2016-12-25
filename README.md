# クライアントサイドセットアップ

* Requirement: Yarn導入, NodeJS導入
* Recommendation: Atom + パッケージ2種(linter by atom-community, linter-eslint by AtomLinter)

`webapp`ディレクトリにて`yarn install`。
現時点では次のコマンドを用意している。

- `yarn build`：文法チェック＆JavaScriptのビルド・依存性解決＆JsDocの出力
- `yarn lint`：JavaScript文法チェック
- `yarn webpack`：JavaScriptのビルドのみ(文法チェックを割愛、開発時のみの想定)
- `node app.js`：ローカルサーバー起動

環境切り替えには`node-config`を使用している。configディレクトリ以下にある`default.json`の値を読めるようにしているが、`export NODE_ENV=dev; node app.js`のようにすると代わりに`dev.json`に書いた内容を読み込むようになるので、この方法によって環境を切り替えること。なお、`config/dev.json`はトラッキング対象外にしているので、個人の環境の内容などを記載して使用してOK。


## Yarnについて
### Yarnでできること(vs npm)

1. ローカルインストール
2. 複数のレジストリ追加
3. 高速インストール
4. パッケージのバージョンを固定化
5. 各開発者のインストールを均一化(npmだとnode_modulesの中身が人によって異なるとか)

https://auth0.com/blog/five-things-you-can-do-with-yarn/

### 導入

Macの場合はhomebrew、Windowsの場合はインストーラーを使用する。

Linuxで且つ、Node導入済の場合、一部設定を改める必要がありとのこと。

Mac or Linuxの場合、`$HOME/.yarn/bin`にパスを通す必要がある。

https://yarnpkg.com/en/docs/install

公式には書かれていないが、`npm install yarn`でもできるらしい

### 使い方
基本的にnpmと同じような使い方ができる。`package.json`を用いる。

* インストール：`yarn` or `yarn install`
* プロジェクトで初めてyarnを使う場合：`yarn init`
* パッケージ追加：`yarn add [package]`
* パッケージ除去：`yarn remove [package]`

https://yarnpkg.com/en/docs/usage

今回のプロジェクトで実施した例：
```
yarn init

(プロジェクト名などを入力)

yarn add react react-redux
yarn add eslint jsdoc --dev
```

## 使用しているツール(特徴的なもの)類について

* ES2015：モダンブラウザでサポートされている標準的となりつつあるJSの仕様及びそれに沿ったJSの書き方。`var`を基本的には使用せず`let`と`const`を使う、アロー関数を使って関数宣言を書く、引数にデフォルトの値を指定できる、for...of文が使える(Javaでいうところの拡張for文)、あたりがわかりやすい変化点。
* React：状態の変化があったらDOMを作成し直すことで、確実な状態の遷移を実現するライブラリ。MVCに当てはめるとすれば、Viewに該当。
* Redux(Flux)：Fluxというシステムデザイン(データの流れをある流れに限定することによってカオスに陥らないように管理しようとするデザイン)の実装(フレームワーク)の一種。Fluxのデザインの中でViewの部分をReactにて実装している。Fluxを実現しているフレームワークの中で最も人気。
* Webpack：NodeJSのモジュール利用方法(`import` / `require()`)を使用できるようにするためのビルドツールの一種。同種のツールに、`Browserify`が有名。
* Babel：コンパイラ。例えばES2015で書いたものをES2015に対応していないブラウザ向けにコンパイルできる。
* ESLint：Lint(文法チェックツール)のES2015向け。
* JSDoc：JSDocの仕様に沿ったコメントを書くことで自動的にドキュメントを生成するツール。


Lintについては、`yarn build`時に自動でチェックし、文法チェックルールを違反している場合にはエラーを返してビルドが進まないようにしてある。毎回`yarn build`や`yarn lint`で確認しても良いが、Atomを使用していて必要なパッケージを入れている場合は、プロジェクトルートディレクトリを`webapp`(=ルートディレクトリ直下に`.eslintrc`を配置)にすることで自動チェック可能。

Webpackについては、JSのエントリーポイントを増やす場合に`webpack.config.js`を編集する必要あり。それ以外の場合は、現在の構成のまま変更不要。ビルドが完了すると、`build`ディレクトリ以下に、関連したJSファイルをすべて一箇所にまとめたファイルが出力されるので、htmlではこちらを読み込んで使用する。

## 新たなJSライブラリを使用する際の手順

1. `webapp`ディレクトリ上にて`yarn add XXX` または `yarn add XXX --dev`(`--dev`は開発時のみ使用することの明示)

    開発時のみ使用するか否かについては、例えばあるJSファイルから`import` / `require`するのであれば開発用ではない。逆に、ビルドのために使用するものや文法チェックのような(例：`eslint`, `webpack`)ものについては`--dev`オプションをつけること。

2. 使用したいJS上にて`import`で当該ライブラリを読み込み

    `{}`付きのimportは、import元(from)から特定のオブジェクトのみをimportするもの。また、`yarn.lock`ファイルは、各開発者間の`node_modules`のバージョン差異をなくすために必要となるものなので、バージョン管理対象とすること。
