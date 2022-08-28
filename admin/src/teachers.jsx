import { Datagrid, EmailField, List, TextField, BooleanField } from 'react-admin';

export const TeacherList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="initials" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="color" />
      <BooleanField source="hide" />
    </Datagrid>
  </List>
);