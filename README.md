# クライアントサイドセットアップ

* Requirement: NodeJS導入
* Recommendation: Yarn導入, Atom + パッケージ2種(linter by atom-community, linter-eslint by AtomLinter)

`webapp`ディレクトリにて`yarn install`(Yarn未導入環境では`npm install`)。
現時点では次のコマンドを用意している。

- `yarn build`(or `npm run build`)：文法チェック＆JavaScriptのビルド・依存性解決＆JsDocの出力
- `yarn lint`(or `npm run lint`)：JavaScript文法チェック
- `yarn webpack`(or `npm run webpack`)：JavaScriptのビルドのみ(文法チェックを割愛、開発時のみの想定)
- `yarn start`(or `npm run start`)：ローカルサーバー起動

環境切り替えには`node-config`を使用している。configディレクトリ以下にある`default.json`の値を読めるようにしているが、`export NODE_ENV=production; yarn start`のようにすると代わりに`production.json`に書いた内容を読み込むようになるので、この方法によって環境を切り替えること。なお、個人の環境の内容を記載する場合は、`.gitignore`に`config/personal.json`とした上で`export NODE_ENV=personal; yarn start`すればOK。

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

# ドキュメント
## 生成手順
`yarn build`を実行した際に、`out`ディレクトリ以下に自動生成するようになっている。生成後の`index.html`を開けば、サイドバーにモジュールやクラスが表示されているのでそれぞれ確認する。

## 記載手順
クラスとモジュールで若干書き方が異なる点に注意する。すべての関数に無理にJSDocを記載する必要はないので、必要な範囲で記載すること。また、記載にあたっては、JSDocに出力される内容だけで大まかな内容がわかるような記載にすること。(ソースを見れば何がimportされているかはわかるが、JSDoc常には表示されないので`@see`を付ける、など)

クラスの場合には次のように、クラス宣言の直前行に付ける形で記載する。`@see`にて参照する際は、クラス名のみで良い。

```JavaScript
import Row from './Row';
import Logger from '../utils/Logger';

/**
 * Rows component, 渡されたデータの数だけRow componentを呼び出し
 * @extends React.Component
 * @see Row
 * @see Logger
 */
class Rows extends React.Component {

}
```

他方、モジュールの場合には次のように、`@module`を付けるが、関数等に付ける形での記載は**してはならない**。モジュール名は重複の恐れがあることから、ディレクトリ名を含める形で宣言する。また、`@see`にて参照する際は、`module:`を付けてからモジュール名を記載する。

```JavaScript
import reducer from '../reducers/index';

/**
 * アプリ全体の設定取りまとめ
 * @module store/kcStore
 * @see module:reducers/index
 */

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);
```

# その他

- comma-style:
    現状ではcomma-last styleを採用している。comma-firstの方が新たな行を加えた際に加えた行のみが変更として示される点、通常先頭と末尾だと末尾の方が頻繁に入れ替わるがその際の変更が楽である点、カンマのつけ忘れが防ぎやすい点、NPMでもcomma-firstを採用している点などがあげられる。他方で、comma-lastの方が一般に馴染みがある点、先頭行に追加的なスペースを入れる必要がない点、ESLintのデフォルトスタイルもcomma-lastである点などがあり、comma-firstに倒すには至らず、comma-lastを採用している。

- quotation-mark:
    現状ではsingle-quotationを採用している。double-quotationの方が一般に(他言語において)馴染みがあり、英文のsingle-quotation(e.g. `it's yours`)がそのまま使用可能である。他方で、single-quotationではHTML要素の操作時に扱いが容易(e.g. `let elem = <div class="myClass"/>`)である点、点の数が減る分可読性が上がる点などがあり、single-quotationを採用している。ただし、HTML要素操作時の利点については、React/ReduxにおいてはJSX形式であるため、クラス名などもJS上で直接操作できることから直接の利点にはならない。(そのためこのプロジェクト上は、可読性が主たる採用理由)

- REST APIとの関係性:
    現状ではREST APIとの関係性については、`REST <--> app.js <--> Public以下のクライアントサイド`としている。即ち、app.jsにて実際にリクエストすべきREST APIとアクセスされたURLとを紐付け、クライアントサイドはapp.jsが構えている`/api`以下のURLとの紐付けとしている。こうすることで、REST APIに変更が生じても、その差分をapp.js内で吸収することにより、クライアントサイドへの影響をなくすことができる。

- 環境変数の利用:
    現状では[node-config](https://www.npmjs.com/package/config)を採用している。採用候補となっていたのは他に[dotenv](https://www.npmjs.com/package/dotenv)があった。一方が明らかに優れているということはないが、ローカルとリモートでファイルを切り替えることを前提にした場合、node-configにおいては、`export NODE_ENV=production;`のような措置をとることになるが、Bluemixでは当該処理が自動的に実施されるためいくらかそのやり方の方が望ましいという判断から採用に至っている。

- ロギングモジュール:
    現状ではクラス化した上で各利用モジュールにおいて読み込み使用、リリース時にログを出力しないような設定の切り替えはファイルの一部を書き換えることによる方法となってしまっている。この方法は望ましくはないので、可能であれば環境変数を利用するなどで簡易的に切り替えができると良い。なお、単にdotenvやnode-configを利用する方法ではうまくいかなかったので注意。
