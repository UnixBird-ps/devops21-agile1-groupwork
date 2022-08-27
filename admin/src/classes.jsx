import { Datagrid, List, ReferenceField, TextField, EditButton, ReferenceInput, SelectInput, TextInput } from 'react-admin';

// const postFilters = [
//   <TextInput source="q" label="Search" alwaysOn />,
//   <ReferenceInput source="userId" label="User" reference="users">
//     <SelectInput optionText="name" />
//   </ReferenceInput>,
// ];

// export const PostList = () => (
//   <List filters={postFilters}>
//     <Datagrid rowClick="edit">
//       <TextField source="id" />
//       <ReferenceField source="userId" reference="users">
//         <TextField source="name" />
//       </ReferenceField>
//       <TextField source="title" />
//       <EditButton />
//     </Datagrid>
//   </List>
// );

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
