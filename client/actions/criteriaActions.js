import { createActions } from "redux-actions";

const { criteria, items } = createActions({
  CRITERIA: {
    SET_CRITERIA: crit => ({ criteria: crit }),
    CLEAR: () => ({}),
  },
  ITEMS: {
    ADD_ITEMS: itemArray => ({ items: itemArray }),
    CLEAR: () => ({}),
  },
});

export { criteria as criteriaActions, items as itemActions};
