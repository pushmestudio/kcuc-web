import React from 'react';
import ReactDOM from 'react-dom';
import Logger from '../utils/Logger';

/**
 * ModalAlert component, モーダルを表示するお試し
 * @see Logger
 */
class ModalAlert extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new Logger();
  }

  /** 警告用モーダルを返す */
  render() {
    return (
      <div className="modal fade" ref='timeoutModal'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title">Timeout</h4>
            </div>
            <div className="modal-body">
              <p>The cart has timed-out. Please try again!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /** componentがマウントされたらモーダルを呼び出す, VirtualDOM更新後モーダルを呼ぶため、100msのタイムアウトをset */
  componentDidMount(){
    this.logger.log('did mount');
    setTimeout(()=> {
      let timeoutModal = ReactDOM.findDOMNode(this.refs.timeoutModal);
      $(timeoutModal).modal('show');
    }, 100);
  }
}

export default ModalAlert;
