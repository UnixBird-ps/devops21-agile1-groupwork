import { Datagrid, SimpleForm, List, Edit, Create, ReferenceField, ReferenceInput, TextField, BooleanField, AutocompleteInput, TextInput, NumberInput, BooleanInput, TimeInput } from 'react-admin';

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

// <List bulkActionButtons={false}>
export const ClassList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <ReferenceField label="School" source="school" reference="schools">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="blog" />
      <TextField source="defaultStartTime" />
      <TextField source="defaultEndTime" />
      <TextField source="defaultInvoiceItem" />
      <TextField source="defaultHoursPerDay" />
      <BooleanField source="hide" looseValue={true} />
    </Datagrid>
  </List>
);


export const ClassEdit = () => (
  <Edit title="Edit Class">
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput label="School" source="school" reference="schools">
        <AutocompleteInput label="School" />
      </ReferenceInput>
      <TextInput source="blog" />
      <TimeInput source="defaultStartTime" />
      <TimeInput source="defaultEndTime" />
      <TextInput source="defaultInvoiceItem" />
      <NumberInput source="defaultHoursPerDay" />
      <BooleanInput source="hide" parse={v => v ? 1 : 0} format={ v => v != 0}/>
    </SimpleForm>
  </Edit>
);


export const ClassCreate = () => (
  <Create title="Register New Class">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput label="School" source="school" reference="schools">
        <AutocompleteInput label="School" />
      </ReferenceInput>
      <TextInput source="blog" />
      <TimeInput source="defaultStartTime" />
      <TimeInput source="defaultEndTime" />
      <TextInput source="defaultInvoiceItem" />
      <NumberInput source="defaultHoursPerDay" />
      <BooleanInput source="hide" defaultChecked={false} defaultValue={0} parse={v => v ? 1 : 0} format={ v => v != 0} />
    </SimpleForm>
  </Create>
);
