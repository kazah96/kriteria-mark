import { connect } from "react-redux";
import { itemActions } from "actions/criteriaActions";
import Component from "./Object";

import normalize from "../../logic/normalizeData";

function mapStateToProps(state) {

  const normalized = normalize(state.items) || [];
  const rows = normalized.map(item => ({
    name: item.itemName,
    ...item.values.reduce((p, c) => ({ ...p, [c.criterion]: c.value }), {}),
  }));

  return {
    criteria: state.criteria,
    rows,
  };
}

export default connect(mapStateToProps)(Component);
