/**
 * @file リクエスト送信先とパラメータを渡してリクエストを簡易的に送るためのクラス
 */

import Logger from '../utils/Logger';

class SendRequest {
  constructor() {
    this.logger = new Logger();
  }
  /**
  * GETでJSONを取得（非同期）
  */
  static sendGet(uri, param) {
    this.logger.log('ASYNC GET ' + uri);
    let $d = $.Deferred();
    try {
      $.ajax({
        type: 'GET',
        async: true,
        url: uri,
        data: param,
        success: function (data) {
          this.logger.dir(data);
          $d.resolve(data);
        },
        error: function (xhr) {
          this.logger.log(xhr.responseText);
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
          this.logger.dir(data);
          $d.resolve(data);
        },
        error: function (xhr) {
          this.logger.log(xhr.responseText);
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
