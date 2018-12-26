import { connect } from "react-redux";
import { criteriaActions, itemActions } from "actions/criteriaActions";

import App from "./App";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  clearAll: () => {
    console.log("CLEARING")
    dispatch(criteriaActions.clear());
    dispatch(itemActions.clear());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
