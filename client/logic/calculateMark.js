import { array, string, object, number } from "yup";

// Schema defining input data
const normalizedDataSchema = array().of(
  object().shape({
    criterion: string().required(),
    value: number()
      .required()
      .min(0)
      .max(1),
  }),
);

const criterionArraySchema = array().of(
  object().shape({
    name: string().required(),
    weight: number().required(),
  }),
);

export default function calculateMark({ normalizedData, criterionArray }) {
  if (!normalizedDataSchema.validateSync(normalizedData))
    throw new Error("normalizedDataSchema is not valid");

  if (!criterionArraySchema.validateSync(criterionArray))
    throw new Error("criterionArraySchema is not valid");

  const crits = criterionArray.reduce(
    (prev, current) => ({ ...prev, [current.name]: current.weight }),
    {},
  );


  return normalizedData.reduce((prevValue, currentValue) => {
    const { criterion, value } = currentValue;

    if (crits[criterion] === undefined)
      throw new Error(`Criterion ${criterion} is undefined`);
    return prevValue + crits[criterion] * value;
  }, 0);
}
