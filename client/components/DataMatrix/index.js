import { connect } from "react-redux";
import Component from "./DataMatrix";

function mapStateToProps(state) {
  return {
    criteria: state.criteria
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
