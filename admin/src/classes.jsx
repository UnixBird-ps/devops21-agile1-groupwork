import { Datagrid, SimpleForm, List, Edit, Create } from 'react-admin';
import { EditButton, ReferenceField, ReferenceInput, TextField, BooleanField, TextInput, NumberInput, BooleanInput, TimeInput, SelectInput } from 'react-admin';
import { Box } from '@mui/material';


const Separator = () => <Box pt="1em" />;


const validateCreateForm = (values) =>
{
  const errors = {};
  // if (!values.name) {
  //     errors.shortName = 'ra.validation.required';
  // }
  if (!values.shortName) {
      errors.shortName = 'ra.validation.required';
  }
  // if (!values.school) {
  //     errors.school = 'ra.validation.required';
  // }
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
  return timeString;
}


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
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm} sx={{ maxWidth: 500 }}>
      <NumberInput disabled source="id" />
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={3} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="name" emptyValue={null} fullWidth/>
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }} fullWidth>
          <TextInput source="shortName" />
        </Box>
      </Box>
      <TextInput source="blog" emptyValue={null} fullWidth />
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1.5} mr={{ xs: 0, sm: '0.5em' }}>
          <TimeInput source="defaultStartTime" parse={stripFromTime} sx={{minWidth:150}} />
        </Box>
        <Box flex={1.5} ml={{ xs: 0, sm: '0.5em' }}>
          <TimeInput source="defaultEndTime" parse={stripFromTime} sx={{minWidth:150}} />
        </Box>
      </Box>
      <NumberInput source="defaultHoursPerDay" defaultValue={0} min={0} max={8} step={0.5} sx={{minWidth:150}}/>
      <Separator />
      <ReferenceInput source="defaultInvoiceItem" reference="invoice_items" emptyValue={null} sort={{ field: 'title', order: 'ASC' }}>
        <SelectInput optionText="title" sx={{minWidth:200}} />
        {/* optionValue="id" */}
      </ReferenceInput>
      <ReferenceInput source="school" reference="schools" emptyValue={null} sort={{ field: 'name', order: 'ASC' }}>
        <SelectInput optionText="name" fullWidth />
      </ReferenceInput>
      <BooleanInput source="hide" emptyValue={null} />
    </SimpleForm>
  </Edit>
);


export const ClassCreate = () => (
  <Create title="Register New Class">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm} sx={{ maxWidth: 500 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={3} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="name" emptyValue={null} fullWidth/>
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="shortName" fullWidth />
        </Box>
      </Box>
      <TextInput source="blog" emptyValue={null} fullWidth />
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1.5} mr={{ xs: 0, sm: '0.5em' }}>
          <TimeInput source="defaultStartTime" parse={stripFromTime} sx={{minWidth:150}} />
        </Box>
        <Box flex={1.5} ml={{ xs: 0, sm: '0.5em' }}>
          <TimeInput source="defaultEndTime" parse={stripFromTime} sx={{minWidth:150}} />
        </Box>
      </Box>
      <NumberInput source="defaultHoursPerDay" defaultValue={0} min={0} max={8} step={0.5} sx={{minWidth:150}}/>
      <Separator />
      <ReferenceInput source="defaultInvoiceItem" reference="invoice_items" emptyValue={null} sort={{ field: 'title', order: 'ASC' }}>
        <SelectInput optionText="title" sx={{minWidth:200}} />
        {/* optionValue="id" */}
      </ReferenceInput>
      <ReferenceInput source="school" reference="schools" emptyValue={null} sort={{ field: 'name', order: 'ASC' }}>
        <SelectInput optionText="name" fullWidth />
      </ReferenceInput>
      <BooleanInput source="hide" emptyValue={null} />
    </SimpleForm>
  </Create>
);
