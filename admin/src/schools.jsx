import { Datagrid, List, TextField } from 'react-admin';

export const SchoolList = () => (
  <List bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
    </Datagrid>
  </List>
);
