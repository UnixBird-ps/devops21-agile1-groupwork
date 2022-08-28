import { Datagrid, SimpleForm, List, Edit, Create, ReferenceInput, AutocompleteInput, TextField, BooleanField, TextInput, NumberInput, BooleanInput, TimeInput } from 'react-admin';

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
  <List bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <TextField source="school" />
      <TextField source="blog" />
      <BooleanField source="hide" looseValue={true} />
      <TextField source="defaultStartTime" />
      <TextField source="defaultEndTime" />
      <TextField source="defaultInvoiceItem" />
      <TextField source="defaultHoursPerDay" />
    </Datagrid>
  </List>
);

export const ClassEdit = () => (
  <Edit title="Edit Class">
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput source="school" label="shortName" reference="schools">
        <AutocompleteInput label="Name" />
      </ReferenceInput>
      <TextInput source="blog" />
      <BooleanInput source="hide" parse={v => v ? 1 : 0} format={ v => v != 0}/>
      <TimeInput source="defaultStartTime" />
      <TimeInput source="defaultEndTime" />
      <TextInput source="defaultInvoiceItem" />
      <NumberInput source="defaultHoursPerDay" />
    </SimpleForm>
  </Edit>
);


export const ClassCreate = () => (
  <Create title="Register New Class">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput source="school" label="shortName" reference="schools">
        <AutocompleteInput label="Name" />
      </ReferenceInput>
      <TextInput source="blog" />
      <BooleanInput source="hide" parse={v => v ? 1 : 0} format={ v => v != 0}/>
      <TimeInput source="defaultStartTime" />
      <TimeInput source="defaultEndTime" />
      <TextInput source="defaultInvoiceItem" />
      <NumberInput source="defaultHoursPerDay" />
    </SimpleForm>
  </Create>
);
