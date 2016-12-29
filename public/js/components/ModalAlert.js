import React from 'react';
import ReactDOM from 'react-dom';
import Logger from '../utils/Logger';

// App component, Headings/Rows componentを呼び出し
class ModalAlert extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new Logger();
  }

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

  componentDidMount(){
    this.logger.log('did mount');
    setTimeout(()=> {
      let timeoutModal = ReactDOM.findDOMNode(this.refs.timeoutModal);
      $(timeoutModal).modal('show');
    }, 100); // VirtualDOM更新後モーダルを呼ぶため、100msのタイムアウトをset
  }
}

export default ModalAlert;
