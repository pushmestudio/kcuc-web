import React from 'react';
import Logger from '../utils/Logger';

// Heading component
class Heading extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new Logger();
  }

  render() {
    this.logger.log('Heading is rendered');
    return <th>{this.props.heading}</th>;
  }
}

export default Heading;
