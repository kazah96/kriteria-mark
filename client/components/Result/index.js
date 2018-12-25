import { connect } from "react-redux";
import Component from "./Result";

function mapStateToProps(state) {
  return {
    items: state.items,
    criterionArray: state.criteria,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
