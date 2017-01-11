import React from 'react';
import Headings from './Headings';
import Rows from './Rows';
import Logger from '../utils/Logger';

/**
 * ページ情報を扱うテーブル, PageContainerからPropsを受け取る
 * @see Headings
 * @see Rows
 * @see Logger
 */
class PageTable extends React.Component {
  constructor(props) {
    // super()を呼び、値を渡すことで、初期化時に渡したプロパティがこのクラスのprops.xxxとして使えるようになる
    super(props);
    this.logger = new Logger();
  }

  /** 検索フォームとテーブルにしたページ情報を返す */
  render() {
    this.logger.log('PageTable is rendered');
    this.logger.dir(this.props);
    return <div>
      <h2>{this.props.title}</h2>
      <h3>Subscribe Page</h3>
      <div className='row'>
        <div className='col-md-4'>
          <input className='form-control' type='text' ref='reguser' placeholder='(e.g. capsmalt)'/>
        </div>
        <div className='col-md-4'>
          <input className='form-control' type='text' ref='regpage' placeholder='(e.g. SSMTU9/welcometoibmverse.html)'/>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-primary' onClick={() => this.props.register(this.refs.reguser.value, this.refs.regpage.value)}>Subscribe</button>
        </div>
      </div>
      <h3>Unsubscribe Page</h3>
      <div className='row'>
        <div className='col-md-4'>
          <input className='form-control' type='text' ref='rmuser' placeholder='(e.g. capsmalt)'/>
        </div>
        <div className='col-md-4'>
          <input className='form-control' type='text' ref='rmpage' placeholder='(e.g. SSMTU9/welcometoibmverse.html)'/>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-danger' onClick={() => this.props.cancel(this.refs.rmuser.value, this.refs.rmpage.value)}>Unsubscribe</button>
        </div>
      </div>
      <h3>Look Up</h3>
      <div className='input-group'>
        <input className='form-control' type='text' ref='searchKey' placeholder='(e.g. capsmalt)'/>
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

export default PageTable;
