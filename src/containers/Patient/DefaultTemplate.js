import React, { Component } from "react";
import { connect } from "react-redux";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  async componentDidMount() {}


  render() {
    return <></>;
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
