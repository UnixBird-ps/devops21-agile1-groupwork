import { Datagrid, List, ReferenceField, TextField, EditButton, ReferenceInput, SelectInput, TextInput } from 'react-admin';

export const ClassList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <TextField source="school" />
      <TextField source="bloghide" />
      <TextField source="defaultStartTime" />
      <TextField source="defaultEndTime" />
      <TextField source="defaultInvoiceItem" />
      <TextField source="defaultHoursPerDay" />
    </Datagrid>
  </List>
);
