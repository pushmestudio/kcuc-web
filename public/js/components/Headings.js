import React from 'react';
import Heading from './Heading';
import Logger from '../utils/Logger';

/**
 * Headings component、渡された数だけ Heading componentを呼び出し
 * @see Heading
 * @see Logger
 */
class Headings extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new Logger();
  }

  /** ヘッダーとして渡された数だけHeadingとして列を返す */
  render() {
    this.logger.log('Headings is rendered');
    let headings = this.props.headings.map((name, index) => {
      return <Heading heading={name} key={index}/>;
    });
    return <thead><tr>{headings}</tr></thead>;
  }
}

export default Headings;
