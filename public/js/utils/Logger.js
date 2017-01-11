/** Util DEBUG_MODEがtrueの際にのみログを出力するためのモジュール */
class Logger {
  /* eslint-disable no-console */
  constructor() {
    this.log;
    this.debug;
    this.trace;
    this.dir;
    this.debugMode = true; // どこか別の箇所から値を読ませる仕組みが必要
    this.init();
  }

  /**
   * 初期化、デバッグモードのON/OFFに合わせて関数を置き換える
   */
  init() {
    if (this.debugMode) {
      let agent = navigator.userAgent; // ユーザエージェント取得
      if(agent.search('MSIE') != -1) { // IEの場合
        if(!window.console) { // 古いIEの場合、F12コンソールを開いていない状態ではconsole.logはエラーになるため、回避策
          this.log = () => {};
          this.debug =  () => {};
          this.trace =  () => {};
          this.dir = () => {};
        } else { // IE系では、最新以外console.debugやconsole.trace未対応のため、すべてconsole.logとする
          let ieLogging = () => {
            let a = Array.prototype.slice.call(arguments);
            Function.prototype.apply.call(console.log, console, a);
          };
          this.log = ieLogging;
          this.debug = ieLogging;
          this.trace = ieLogging;
          this.dir = ieLogging;
        }
      } else {
        this.log = console.log.bind(console); // console.logの処理をバインド
        this.debug = console.debug.bind(console); // console.debugの処理をバインド
        this.trace = console.trace.bind(console); // console.traceの処理をバインド
        this.dir = console.dir.bind(console); // console.dirの処理をバインド
      }
    } else {
      this.log = () => {};
      this.debug =  () => {};
      this.trace =  () => {};
      this.dir = () => {};

      /* 下記までやれば、誰かが誤ってこのモジュールを使用せずに出力させてしまった普通のログについても出力を抑制できるが、そこまでやるかどうか
      console.log = () => {};
      console.debug = () => {};
      console.trace = () => {};
      console.dir = () => {};
      */
    }
  }
}

export default Logger;
