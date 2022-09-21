import { Datagrid, SimpleForm, List, Edit, Create, EditButton, TextField, TextInput, NumberInput } from 'react-admin';
import { Box } from '@mui/material';


const validateCreateForm = (values) =>
{
  const errors = {};
  // if (!values.name) {
  //     errors.name = 'ra.validation.required';
  // }
  if (!values.shortName) {
      errors.shortName = 'ra.validation.required';
  }
  return errors;
}


export const SchoolList = () => (
  <List title="Schools">
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <EditButton />
    </Datagrid>
  </List>
);


export const SchoolEdit = () => (
  <Edit title="Edit School">
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
    </SimpleForm>
  </Edit>
);


export const SchoolCreate = () => (
  <Create title="Register New School">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm} sx={{ maxWidth: 500 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={3} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="name" fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="shortName" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);
