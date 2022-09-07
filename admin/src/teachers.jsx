import { Datagrid, SimpleForm, List, EditButton, Edit, Create } from 'react-admin';
import { TextField, BooleanField, ArrayField, SingleFieldList } from 'react-admin';
import { TextInput, NumberInput, BooleanInput, PasswordInput, AutocompleteArrayInput, SelectArrayInput, ArrayInput, ChipField, SimpleFormIterator } from 'react-admin';
import { useRecordContext } from 'react-admin';


const choices = [
   { id: 'admin', role: 'admin' },
   { id: 'user', role:  'user' }
];


const RolesField = ( source ) =>
{
  const record = useRecordContext( source );
  // record && console.log( record.roles );
  return record ? <span>{ Object.values( record.roles ).join(',') }</span> : null;
};


//  rowClick="edit" bulkActionButtons={false} hasCreate={true}
export const TeacherList = () => (
  <List title="Teachers">
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="initials" />
      <TextField source="phone" />
      <TextField source="email" />
      <TextField source="color" />
      <RolesField source="roles" />
      <BooleanField source="hide" looseValue={true} />
      <EditButton />
    </Datagrid>
  </List>
);


const validateEditForm = (values) =>
{
  const errors = {};
  if (!values.email) {
      errors.email = 'Email is required';
  }
  return errors;
}


export const TeacherEdit = () => (
  <Edit title="Edit Teacher">
    <SimpleForm warnWhenUnsavedChanges validate={validateEditForm}>
      <NumberInput disabled source="id" />
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="initials" />
      <TextInput source="phone" />
      <TextInput source="email" />
      <TextInput source="color" />
      <AutocompleteArrayInput source="roles" choices={choices} optionValue="role" optionText="role" />
      <BooleanInput source="hide" defaultChecked={false} defaultValue={0} parse={v => v ? 1 : 0} format={ v => v != 0} />
    </SimpleForm>
  </Edit>
);


const validateCreateForm = (values) =>
{
  const errors = {};
  if (!values.email) {
      errors.email = 'Email is required';
  }
  if (!values.password) {
      // You can return translation keys
      errors.password = 'ra.validation.required';
  }
  return errors;
}


export const TeacherCreate = () => (
  <Create title="Register New Teacher">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm}>
      <TextInput source="email" inputProps={{ autocomplete: 'off' }} defaultValue={""} />
      <PasswordInput source="password" inputProps={{ autocomplete: 'new-password' }} defaultValue={""} />
      <AutocompleteArrayInput source="roles" choices={choices} optionValue="role" optionText="role" />
    </SimpleForm>
  </Create>
);
