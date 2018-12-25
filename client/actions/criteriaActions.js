import { createActions } from "redux-actions";

const { criteria, items } = createActions({
  CRITERIA: {
    SET_CRITERIA: crit => ({ criteria: crit }),
  },
  ITEMS: {
    ADD_ITEMS: itemArray => ({ items: itemArray }),
  },
});

export { criteria as criteriaActions, items as itemActions};
