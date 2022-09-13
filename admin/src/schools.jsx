import { Datagrid, SimpleForm, List, Edit, Create, EditButton, TextField, TextInput, NumberInput } from 'react-admin';


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
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm}>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="shortName" />
    </SimpleForm>
  </Edit>
);


export const SchoolCreate = () => (
  <Create title="Register New School">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm}>
      <TextInput source="name" />
      <TextInput source="shortName" />
    </SimpleForm>
  </Create>
);
