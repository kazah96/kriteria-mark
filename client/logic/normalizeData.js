import { array, string, object, number, boolean } from "yup";

// Schema defining input data
const valuesMatrixSchema = array().of(
  object().shape({
    itemName: string().required(),
    values: array().of(
      object().shape({
        criterion: string().required(),
        max: boolean(),
        value: number().required(),
      }),
    ),
  }),
);

export default function normalizeMatrix(valuesMatrix) {
  if (valuesMatrix.length === 0) return null;

  if (!valuesMatrixSchema.validateSync(valuesMatrix))
    throw new Error("valuesMatrixSchema is not valid");

  const criteries = valuesMatrix[0].values.map(item => item.criterion);

  const criteriaMinMaxTable = criteries.reduce((prev, crit) => {
    const values = valuesMatrix.map(item => {
      const value = item.values.find(e => e.criterion === crit);

      if (value === undefined) throw new Error("No such criteria");

      return value.value;
    });

    return {
      ...prev,
      [crit]: { min: Math.min(...values), max: Math.max(...values) },
    };
  }, {});

  return valuesMatrix.map(item => ({
    itemName: item.itemName,
    values: item.values.map(criteria => {
      const crit = criteriaMinMaxTable[criteria.criterion];

      const value =
        criteria.max !== true
          ? (criteria.value - crit.min) / (crit.max - crit.min)
          : (crit.max - criteria.value) / (crit.max - crit.min);

      return {
        ...criteria,
        value: value || 0,
      };
    }),
  }));
}
