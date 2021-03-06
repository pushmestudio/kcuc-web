/**
 * ユーザー情報を取り扱うReducer, 次のアクションを受け取る
 * <pre><code>START_FETCH_USERS, SUCCESS_FETCH_USERS, ERROR_FETCH_USERS</code></pre>
 * @module reducers/kcUser
 */

let kcUser = (state = {
  users: [],
  headings: [' ', 'ID', 'Flag'],
  title: 'User List',
  type: 'users'
}, action) => {
  switch (action.type) {
  case 'START_FETCH_USERS':
    return state;
  case 'SUCCESS_FETCH_USERS':
    return Object.assign({}, state, {users: action.data.subscribers});
  case 'ERROR_FETCH_USERS':
    alert('An error has occured in fetching users. Please try it again later.'); // TODO より適切なアナウンス方法に変更
    return state;
  default:
    return state;
  }
};
export default kcUser;
