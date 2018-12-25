import { array, string } from "yup";

// Schema defining input data
const Schema = array().of(string());

export default function criteriaWeightGenerate(...criteria) {
  if (!Schema.isValidSync(criteria))
    throw new Error("Schema in weight criteria generate is not valid");

  const { length } = criteria;
  const sum = (length * (length + 1)) / 2;

  return criteria.map((name, key) => ({
    name,
    weight: (key + 1) / sum,
  }));
}
