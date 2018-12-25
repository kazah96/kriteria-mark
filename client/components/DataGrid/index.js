import { connect } from "react-redux";
import { itemActions } from "actions/criteriaActions";
import Component from "./Object";

function mapStateToProps(state) {
  return {
    criteria: state.criteria,
    items: state.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onItemsChange: items => {
      const res = items.map(item => {
        const values = Object.keys(item)
          .filter(ww => ww !== "name")
          .map(param => ({ criterion: param, value: parseFloat(item[param]) || 0 }));
        return { itemName: item.name, values };
      });
      dispatch(itemActions.addItems(res));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
