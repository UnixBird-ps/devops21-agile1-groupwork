import { Datagrid, EmailField, List, TextField, BooleanField } from 'react-admin';

export const TeacherList = () => (
  <List bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="initials" />
      <TextField source="phone" />
      <TextField source="email" />
      <TextField source="color" />
      <TextField source="hide" />
      <TextField source="roles" />
    </Datagrid>
  </List>
);
