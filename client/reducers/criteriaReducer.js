import { handleActions } from "redux-actions";
import { criteriaActions, itemActions } from "actions/criteriaActions";

const criteriaReducer = handleActions(
  {
    [criteriaActions.setCriteria]: (state, action) => ({
      ...action.payload.criteria,
    }),
  },
  {},
);

const itemReducer = handleActions(
  {
    [itemActions.addItems]: (state, action) => [...action.payload.items],
  },
  [],
);

export { criteriaReducer, itemReducer };
