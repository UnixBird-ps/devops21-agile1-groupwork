import { Edit, SimpleForm, TextInput, NumberInput, BooleanInput } from 'react-admin';

export const TeacherEdit = () => (
  <Edit title="Edit Teacher">
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="initials" />
      <TextInput source="phone" />
      <TextInput source="email" />
      <TextInput source="color" />
      <BooleanInput source="hide" parse={v => v ? 1 : 0} format={ v => v != 0}/>
      <TextInput source="roles" />
    </SimpleForm>
  </Edit>
);
