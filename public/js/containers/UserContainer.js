import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import UserTable from '../components/UserTable';
import Logger from '../utils/Logger';

/**
 * ユーザー情報を持つコンテナ, UserTableにPropsを渡す
 * @module containers/UserContainer
 * @see UserTable
 * @see Logger
 */

 /** kcUserのStateをプロパティに変換する */
const mapStateToProps = (state) => {
  let logger = new Logger();

  logger.log('container state:');
  logger.dir(state);
  return {
    headings: state.kcUser.headings,
    results: state.kcUser.users,
    title: state.kcUser.title,
    type: state.kcUser.type
  };
};

/** アクションをdispatchと共にプロパティに変換する */
const mapDispatchToProps = (dispatch) => {
  let logger = new Logger();

  logger.log('dispatch to props:');
  return {
    fetch: (page) => {
      dispatch(fetchUsers(page));
    }
  };
};

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTable);

export default UserContainer;
