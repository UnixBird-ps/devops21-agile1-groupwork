import { Edit, SimpleForm, NumberInput, TextInput } from 'react-admin';

export const SchoolEdit = () => (
  <Edit title="Edit School">
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="shortName" />
    </SimpleForm>
  </Edit>
);
