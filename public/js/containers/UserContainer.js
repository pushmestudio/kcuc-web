import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import UserTable from '../components/UserTable';
import Logger from '../utils/Logger';

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
