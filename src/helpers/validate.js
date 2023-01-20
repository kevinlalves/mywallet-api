export default function validate(object, schema, res) {
  const { error } = schema.validate(object, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map(detail => detail.message);

    res.status(422).send(errorMessages);
    return false;
  }

  return true;
}
