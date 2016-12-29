import React from 'react';
import Row from './Row';
import Logger from '../utils/Logger';

// Rows component, 渡されたデータの数だけRow componentを呼び出し
class Rows extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new Logger();
  }

  render() {
    this.logger.log('Rows is rendered');
    this.logger.dir(this.props.dataSet);
    let rows = this.props.dataSet.map((data, index) => {
      return(<Row key={index} {...data} type={this.props.type} />);
    });
    return <tbody>{rows}</tbody>;
  }
}

export default Rows;
