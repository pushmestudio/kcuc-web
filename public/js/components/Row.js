import React from 'react';
import ReactDOM from 'react-dom';
import ModalAlert from './ModalAlert';
import Logger from '../utils/Logger';

/**
 * Row component
 * @extends React.Component
 * @see ModalAlert
 * @see Logger
 */
class Row extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new Logger();
  }

  /** 行のタイプに合わせて、行を生成して返す */
  getEachRow(rowType) {
    if (rowType === 'pages') {
      return <tr>
      <td><input type='checkbox' ref='checkBox' onChange={(e) => this.handleTick(e)}/></td>
      <td>{this.props.pageHref}</td>
      <td>{String(this.props.isUpdated)}</td>
      <td><input type='text' ref='textBox' onChange={(e) => this.handleChange(e)}/></td>
      </tr>;
    } else if (rowType === 'users') {
      return <tr>
      <td><input type='checkbox' ref='checkBox' onChange={(e) => this.handleTick(e)}/></td>
      <td>{this.props.userName}</td>
      <td>{String(this.props.isUpdated)}</td>
      </tr>;
    }
  }

  /** 行を返す */
  render() {
    this.logger.log('Row is rendered');
    this.logger.dir(this.props);
    return this.getEachRow(this.props.type);
  }

  /** 値の変更を検知して更新 */
  handleChange() {
    this.logger.log('value is updated');
  }

  /** チェックON/OFF */
  handleTick() {
    if (this.refs.checkBox.selected) {
      ReactDOM.render(<ModalAlert />, document.getElementById('modalAlert'));
    }
  }
}

export default Row;
