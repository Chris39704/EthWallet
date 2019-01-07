// @flow
import * as React from 'react';

export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}
