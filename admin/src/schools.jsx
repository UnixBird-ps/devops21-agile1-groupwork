import { Datagrid, SimpleForm, List, Edit, Create, TextField, TextInput, NumberInput } from 'react-admin';

export const SchoolList = () => (
  <List bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
    </Datagrid>
  </List>
);

export const SchoolEdit = () => (
  <Edit title="Edit School">
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="shortName" />
    </SimpleForm>
  </Edit>
);

export const SchoolCreate = () => (
  <Create title="Register New School">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="shortName" />
    </SimpleForm>
  </Create>
);
