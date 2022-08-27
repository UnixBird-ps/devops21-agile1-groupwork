import { Datagrid, List, ReferenceField, TextField, EditButton, ReferenceInput, SelectInput, TextInput, BooleanField } from 'react-admin';

export const CourseList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <TextField source="class" />
      <TextField source="points" />
      <TextField source="startDate" />
      <TextField source="plan" />
      <TextField source="invoiceItem" />
      <TextField source="hoursPerDay" />
      <BooleanField source="hide" />
    </Datagrid>
  </List>
);
