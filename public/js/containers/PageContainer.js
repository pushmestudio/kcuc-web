import { connect } from 'react-redux';
import { fetchPages, registerPage, cancelPage } from '../actions';
import PageTable from '../components/PageTable';
import Logger from '../utils/Logger';

/**
 * ページ情報を持つコンテナ, PageTableにPropsを渡す
 * @module containers/PageContainer
 * @see PageTable
 * @see Logger
 */

 /** kcPageのStateをプロパティに変換する */
const mapStateToProps = (state) => {
  let logger = new Logger();

  logger.log('container state:');
  logger.dir(state);
  return {
    headings: state.kcPage.headings,
    results: state.kcPage.pages,
    title: state.kcPage.title,
    type: state.kcPage.type,
  };
};

/** アクションをdispatchと共にプロパティに変換する */
const mapDispatchToProps = (dispatch) => {
  let logger = new Logger();

  logger.log('dispatch to props:');
  return {
    fetch: (user) => {
      dispatch(fetchPages(user));
    },
    register: (user, page) => {
      dispatch(registerPage(user, page));
    },
    cancel: (user, page) => {
      dispatch(cancelPage(user, page));
    }
  };
};

const PageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTable);

export default PageContainer;
