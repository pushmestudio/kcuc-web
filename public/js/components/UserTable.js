import React from 'react';
import Headings from './Headings';
import Rows from './Rows';
import Logger from '../utils/Logger';

/**
 * ユーザー情報を扱うテーブル, UserContainerからPropsを受け取る
 * @see Headings
 * @see Rows
 * @see Logger
 */
class UserTable extends React.Component {
  constructor(props) {
    // super()を呼び、値を渡すことで、初期化時に渡したプロパティがこのクラスのprops.xxxとして使えるようになる
    super(props);
    this.logger = new Logger();
  }

  /** 検索フォームとテーブルにしたユーザー情報を返す */
  render() {
    this.logger.log('UserTable is rendered');
    this.logger.dir(this.props);
    return <div>
      <h2>{this.props.title}</h2>
      <h3>Look Up</h3>
      <div className='input-group'>
        <input className='form-control' type='text' ref='searchKey' placeholder='(e.g. SSMTU9/welcometoibmverse.html)'/>
        <span className='input-group-btn'>
          <button className='btn btn-primary' onClick={() => this.props.fetch(this.refs.searchKey.value)}>Search</button>
        </span>
      </div>
      <h3>Search Result</h3>
      <div className="table-responsive">
        <table className='table table-bordered'>
          <Headings headings={this.props.headings} />
          <Rows dataSet={this.props.results} type={this.props.type} />
        </table>
      </div>
    </div>;
  }
}

export default UserTable;
