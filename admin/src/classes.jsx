import { required, Datagrid, SimpleForm, List, Edit, Create } from 'react-admin';
import { EditButton, ReferenceField, ReferenceInput, TextField, BooleanField, AutocompleteInput, TextInput, NumberInput, BooleanInput, TimeInput, SelectInput } from 'react-admin';


const validateCreateForm = (values) =>
{
  const errors = {};
  if (!values.name) {
      errors.name = 'Name is required';
  }
  if (!values.shortName) {
      // You can return translation keys
      errors.shortName = 'ra.validation.required';
  }
  if (!values.school) {
      // errors.school = 'School is required';
      errors.school = 'ra.validation.required';
  }
  if (!values.defaultInvoiceItem) {
      // errors.defaultInvoiceItem = 'Default invoice item is required';
      errors.defaultInvoiceItem = 'ra.validation.required';
  }
  return errors;
}


// Created this function because some browsers send in value from a input of type 'time' as whole ISO Date & Time string.
const stripFromTime = ( timeString ) =>
{
  // console.log( timeString );
  timeString = timeString.includes('T') ? timeString.split( 'T' )[1] : timeString;
  // console.log( timeString );
  timeString = timeString.includes('.') ? timeString.split( '.' )[0] : timeString;
  // console.log( timeString );
  // let timeStringArr = timeString.split( ':' );
  // console.log( timeStringArr );
  // if ( timeStringArr.length > 2 ) timeStringArr.splice( -1 );
  // console.log( timeStringArr );
  // timeString = timeStringArr.join();
  // console.log( timeString );
  return timeString;
}


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
  <List title="Classes">
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <ReferenceField label="School" source="school" reference="schools">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="blog" />
      <TextField source="defaultStartTime" />
      <TextField source="defaultEndTime" />
      <ReferenceField source="defaultInvoiceItem" reference="invoice_items">
        <TextField source="title" />
      </ReferenceField>
      <BooleanField source="hide" looseValue={true} />
      <EditButton />
    </Datagrid>
  </List>
);


export const ClassEdit = () => (
  <Edit title="Edit Class">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm}>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput source="school" reference="schools">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="blog" />
      <TimeInput source="defaultStartTime" parse={stripFromTime} />
      <TimeInput source="defaultEndTime" parse={stripFromTime} />
      <ReferenceInput source="defaultInvoiceItem" reference="invoice_items">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <NumberInput source="defaultHoursPerDay" defaultValue={0} min={0} max={8} step={0.5}/>
      <BooleanInput source="hide" defaultValue={false} />
    </SimpleForm>
  </Edit>
);


export const ClassCreate = () => (
  <Create title="Register New Class">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm}>
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput source="school" reference="schools">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="blog" defaultValue="" />
      <TimeInput source="defaultStartTime" parse={stripFromTime} />
      <TimeInput source="defaultEndTime" parse={stripFromTime} />
      <ReferenceInput source="defaultInvoiceItem" reference="invoice_items">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <NumberInput source="defaultHoursPerDay" defaultValue={0} min={0} max={8} step={0.5}/>
      <BooleanInput source="hide" defaultValue={false} />
    </SimpleForm>
  </Create>
);
