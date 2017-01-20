import SendRequest from '../utils/SendRequest';
import Logger from '../utils/Logger';

/**
 * アクションクリエイター、各関数でアクションを返す
 * @module actions/index
 * @see Logger
 */

export const startFetchPages = () => {
  return {
    type: 'START_FETCH_PAGES'
  };
};

export const successFetchPages = (result) => {
  return {
    type: 'SUCCESS_FETCH_PAGES',
    data: result
  };
};

export const errorFetchPages = () => {
  return {
    type: 'ERROR_FETCH_PAGES'
  };
};

/** ユーザーIDをキーに、ページを取得する */
export const fetchPages = (userId) => {
  let logger = new Logger();

  return (dispatch) => {
    dispatch(startFetchPages());

    let requestPagesParam = {user: userId};
    const kcucPagesApi = '/api/check/pages';
    $('#loader').removeClass('hidden'); // ローディングアイコン表示

    SendRequest.sendGet(kcucPagesApi, requestPagesParam).then((res) => {
      logger.dir(res);

      let acceptableCode = [200, 304];
      if (acceptableCode.indexOf(res.code) === -1) {
        dispatch(errorFetchPages());
      } else {
        dispatch(successFetchPages(res));
      }
    }).fail(() => {
      dispatch(errorFetchPages());
    }).always(() => {
      $('#loader').addClass('hidden'); // ローディングアイコン非表示
    });
  };
};

export const startFetchUsers = () => {
  return {
    type: 'START_FETCH_USERS'
  };
};

export const successFetchUsers = (result) => {
  return {
    type: 'SUCCESS_FETCH_USERS',
    data: result
  };
};

export const errorFetchUsers = () => {
  return {
    type: 'ERROR_FETCH_USERS'
  };
};

/** ページをキーに、購読ユーザーを取得する */
export const fetchUsers = (page) => {
  let logger = new Logger();

  return (dispatch) => {
    dispatch(startFetchUsers());

    let requestUsersParam = {href: page};
    const kcucUsersApi = '/api/check/users';
    $('#loader').removeClass('hidden'); // ローディングアイコン表示

    SendRequest.sendGet(kcucUsersApi, requestUsersParam).then((res) => {
      logger.dir(res);

      let acceptableCode = [200, 304];
      if (acceptableCode.indexOf(res.code) === -1) {
        dispatch(errorFetchUsers());
      } else {
        dispatch(successFetchUsers(res));
      }
    }).fail(() => {
      dispatch(errorFetchUsers());
    }).always(() => {
      $('#loader').addClass('hidden'); // ローディングアイコン非表示
    });
  };
};

export const startRegisterPage = () => {
  return {
    type: 'START_REG_PAGE'
  };
};

export const successRegisterPage = (result) => {
  return {
    type: 'SUCCESS_REG_PAGE',
    data: result
  };
};

export const errorRegisterPage = () => {
  return {
    type: 'ERROR_REG_PAGE'
  };
};

/** ユーザーとページを使って、ページを対象ユーザーの購読一覧に追加する */
export const registerPage = (user, page) => {
  let logger = new Logger();

  return (dispatch) => {
    dispatch(startRegisterPage());

    let requestRegisterParam = {user: user, href: page};
    const kcucUsersApi = '/api/check/pages';
    $('#loader').removeClass('hidden'); // ローディングアイコン表示

    SendRequest.sendPost(kcucUsersApi, requestRegisterParam).then((res) => {
      logger.dir(res);

      let acceptableCode = [200, 304];
      if (acceptableCode.indexOf(res.code) === -1) {
        dispatch(errorRegisterPage());
      } else {
        dispatch(successRegisterPage(res));
      }
    }).fail(() => {
      dispatch(errorRegisterPage());
    }).always(() => {
      $('#loader').addClass('hidden'); // ローディングアイコン非表示
    });
  };
};

export const startCancelPage = () => {
  return {
    type: 'START_CANCEL_PAGE'
  };
};

export const successCancelPage = (result) => {
  return {
    type: 'SUCCESS_CANCEL_PAGE',
    data: result
  };
};

export const errorCancelPage = () => {
  return {
    type: 'ERROR_CANCEL_PAGE'
  };
};

/**
 * ユーザーとページを使って、ページを対象ユーザーの購読一覧から取り除く
 * @todo 現時点で購読解除のAPIはできていないため、パラメーターを送ると購読をするようになっている、APIが出来次第URLを切り替える
 */
export const cancelPage = (user, page) => {
  let logger = new Logger();

  return (dispatch) => {
    dispatch(startCancelPage());

    let requestCancelParam = {user: user, href: page};
    const kcucUsersApi = '/api/check/pages';
    $('#loader').removeClass('hidden'); // ローディングアイコン表示

    SendRequest.sendPost(kcucUsersApi, requestCancelParam).then((res) => {
      logger.dir(res);

      let acceptableCode = [200, 304];
      if (acceptableCode.indexOf(res.code) === -1) {
        dispatch(errorCancelPage());
      } else {
        dispatch(successCancelPage(res));
      }
    }).fail(() => {
      dispatch(errorCancelPage());
    }).always(() => {
      $('#loader').addClass('hidden'); // ローディングアイコン非表示
    });
  };
};
