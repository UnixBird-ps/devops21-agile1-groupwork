import { Datagrid, SimpleForm, List, Edit, Create, TextField, BooleanField, TextInput, NumberInput, BooleanInput, PasswordInput } from 'react-admin';

export const TeacherList = () => (
  <List bulkActionButtons={false} hasCreate={true}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="initials" />
      <TextField source="phone" />
      <TextField source="email" />
      <TextField source="color" />
      <BooleanField source="hide" looseValue={true} />
      <TextField source="roles" />
    </Datagrid>
  </List>
);

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
      <BooleanInput source="hide" parse={v => v ? 1 : 0} format={ v => v != 0} />
      <TextInput source="roles" />
    </SimpleForm>
  </Edit>
);

export const TeacherCreate = () => (
  <Create title="Register New Teacher">
    <SimpleForm>
      <TextInput source="email" inputProps={{ autocomplete: 'off' }} defaultValue="" />
      <PasswordInput source="password" inputProps={{ autocomplete: 'new-password' }} defaultValue="" />
    </SimpleForm>
  </Create>
);
