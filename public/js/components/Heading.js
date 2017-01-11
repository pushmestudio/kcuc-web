import React from 'react';
import Logger from '../utils/Logger';

/**
 * Heading component
 * @extends React.Component
 * @see Logger
 */
class Heading extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new Logger();
  }

  /** 先頭行に使うための1カラムを返す */
  render() {
    this.logger.log('Heading is rendered');
    return <th>{this.props.heading}</th>;
  }
}

export default Heading;
