/** Util リクエスト送信先とパラメータを渡してリクエストを簡易的に送るためのクラス */
class SendRequest {
  /**
   * GETでJSONを取得（非同期）
   * @param {string} uri リクエスト送信先のURI
   * @param {string} param 送信するパラメーター
   * @return {Promise<object>} data リクエスト結果
   */
  static sendGet(uri, param) {
    let $d = $.Deferred();
    try {
      $.ajax({
        type: 'GET',
        async: true,
        url: uri,
        data: param,
        success: function (data) {
          $d.resolve(data);
        },
        error: function () {
          $d.reject();
        }
      });
    } catch (e) {
      $d.reject();
    }
    return $d.promise();
  }

  /**
   * POSTでJSONを送信してJSONを取得（非同期）
   * @param {string} uri リクエスト送信先のURI
   * @param {string} param 送信するパラメーター, フォーム扱い
   * @return {Promise<object>} data リクエスト結果
   */
  static sendPost(uri, param) {
    let $d = $.Deferred();
    try {
      $.ajax({
        type: 'POST',
        async: true,
        url: uri,
        data: param,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
          $d.resolve(data);
        },
        error: function () {
          $d.reject();
        }
      });
    } catch (e) {
      $d.reject();
    }
    return $d.promise();
  }
}

export default SendRequest;
