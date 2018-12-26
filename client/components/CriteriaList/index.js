import { connect } from "react-redux";
import { criteriaActions } from "actions/criteriaActions";
import shortid from "shortid";
import Component from "./CriteriaList";
import generateWeight from "../../logic/criteriaWeightGenerate";

function mapStateToProps(state) {
  const items = Object.keys(state.criteria).map((crit) => ({
    id: shortid.generate(),
    content: crit,
  }));
  return {
    items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onItemsChange: items => {
      const itemsArr = items.map(item => item.content).reverse();
      const weights = generateWeight(...itemsArr);
      const criteriaObj = weights.reduce(
        (prev, cur) => ({ ...prev, [cur.name]: cur.weight }),
        {},
      );
      dispatch(criteriaActions.setCriteria(criteriaObj));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
