import React from 'react';
import PageContainer from '../containers/PageContainer';
import UserContainer from '../containers/UserContainer';
import Logger from '../utils/Logger';

/**
 * App component, Headings/Rows componentを呼び出し
 * @extends React.Component
 * @see module:containers/PageContainer
 * @see module:containers/UserContainer
 * @see Logger
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new Logger();
  }

  /** アプリで使用するコンテナを返す  */
  render() {
    this.logger.log('App is rendered');
    return <div className='container'>
      <h1 className="title">Knowledge Center Update Checker</h1>
      <PageContainer></PageContainer>
      <hr/>
      <UserContainer></UserContainer>
    </div>;
  }
}

export default App;
