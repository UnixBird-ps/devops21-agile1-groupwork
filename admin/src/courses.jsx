import { List, Datagrid, SimpleForm, Edit, Create, } from 'react-admin';
import { ReferenceField, TextField, NumberField, BooleanField } from 'react-admin';
import { EditButton, ReferenceInput, TextInput, NumberInput, DateInput, BooleanInput, SelectInput } from 'react-admin';
import { Box } from '@mui/material';


const Separator = () => <Box pt="1em" />;


const validateCreateForm = (values) =>
{
  const errors = {};
  if (!values.name) {
      errors.name = 'Name is required';
  }
  if (!values.shortName) {
      errors.shortName = 'ra.validation.required';
  }
  return errors;
}


export const CourseList = () => (
  <List title="Courses">
    <Datagrid>
      <NumberField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <ReferenceField source="class" reference="classes">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="points" />
      <TextField source="startDate" />
      <TextField source="endDate" />
      <TextField source="plan" />
      <ReferenceField source="invoiceItem" reference="invoice_items">
        <TextField source="title" />
      </ReferenceField>
      <NumberField source="hoursPerDay" />
      <BooleanField source="hide" looseValue={true} />
      <EditButton />
    </Datagrid>
  </List>
);


export const CourseEdit = () => (
  <Edit title="Edit Course">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm} sx={{ maxWidth: 500 }}>
      <NumberInput disabled source="id" />
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={3} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="name" fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="shortName" fullWidth />
        </Box>
      </Box>
      <ReferenceInput source="class" reference="classes" sort={{ field: 'name', order: 'ASC' }}>
        <SelectInput optionText="name" fullWidth />
      </ReferenceInput>
      <NumberInput source="points" />
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1.75} mr={{ xs: 0, sm: '0.5em' }}>
          <DateInput source="startDate" sx={{minWidth:150}} />
        </Box>
        <Box flex={1.75} ml={{ xs: 0, sm: '0.5em' }}>
          <DateInput source="endDate" sx={{minWidth:150}} />
        </Box>
      </Box>
      <NumberInput source="hoursPerDay" defaultValue={0} min={0} max={8} step={0.5} sx={{minWidth:150}}/>
      <TextInput source="plan" />
      <ReferenceInput source="invoiceItem" reference="invoice_items" sort={{ field: 'title', order: 'ASC' }}>
        <SelectInput optionText="title" sx={{minWidth:200}} />
      </ReferenceInput>
      <BooleanInput source="hide" defaultValue={false} />
    </SimpleForm>
  </Edit>
);


export const CourseCreate = () => (
  <Create title="Register New Course">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm} sx={{ maxWidth: 500 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={3} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="name" fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="shortName" fullWidth />
        </Box>
      </Box>
      <ReferenceInput source="class" reference="classes" sort={{ field: 'name', order: 'ASC' }}>
        <SelectInput optionText="name" fullWidth />
      </ReferenceInput>
      <NumberInput source="points" />
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1.75} mr={{ xs: 0, sm: '0.5em' }}>
          <DateInput source="startDate" sx={{minWidth:150}} />
        </Box>
        <Box flex={1.75} ml={{ xs: 0, sm: '0.5em' }}>
          <DateInput source="endDate" sx={{minWidth:150}} />
        </Box>
      </Box>
      <NumberInput source="hoursPerDay" defaultValue={0} min={0} max={8} step={0.5} sx={{minWidth:150}}/>
      <TextInput source="plan" />
      <ReferenceInput source="invoiceItem" reference="invoice_items" sort={{ field: 'title', order: 'ASC' }}>
        <SelectInput optionText="title" sx={{minWidth:200}} />
      </ReferenceInput>
      <BooleanInput source="hide" defaultValue={false} />
    </SimpleForm>
  </Create>
);
