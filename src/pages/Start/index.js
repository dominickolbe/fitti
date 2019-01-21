import React, { Component } from 'react';
import { withAuth } from '../../components/Firebase';

class Start extends Component {
  state = {
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  render() {
    return (
      <div className="container">
        Start
      </div>
    );
  }
}

export default withAuth(Start);
