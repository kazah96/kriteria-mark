import { connect } from "react-redux";
import Component from "./Result";

import normalize from "../../logic/normalizeData";
import calculateMark from "../../logic/calculateMark";

function mapStateToProps(state) {
  const normalized = normalize(state.items) || [];

  const items = normalized
    .map(item => ({
      name: item.itemName,
      mark: calculateMark({
        normalizedData: item.values,
        criterionArray: Object.keys(state.criteria).map(cr => ({
          name: cr,
          weight: state.criteria[cr],
        })),
      }),
    }))
    .sort((a, b) => {
      if (a.mark > b.mark) return -1;
      if (a.mark < b.mark) return 1;
      return 0;
    });

  return {
    items,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
