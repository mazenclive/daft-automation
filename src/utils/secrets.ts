import * as yup from 'yup';

import * as secrets from '../secrets.json';

const secreteSchema = yup.object({
  auth: yup
    .object({
      username: yup.string().required(),
      password: yup.string().required(),
    })
    .required(),
});

type Secret = yup.InferType<typeof secreteSchema>;

export async function getSecrets(): Promise<Secret> {
  return await secreteSchema.validate(secrets);
}
