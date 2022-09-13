import { Datagrid, SimpleForm, List, EditButton, Edit, Create } from 'react-admin';
import { TextField, BooleanField, ArrayField, SingleFieldList } from 'react-admin';
import { TextInput, NumberInput, BooleanInput, PasswordInput, AutocompleteArrayInput, SelectArrayInput, ArrayInput, ChipField, SimpleFormIterator } from 'react-admin';
import { useRecordContext } from 'react-admin';


// Returns a combined div containing the record's color value and a colored bar under the text
const ColorField = ( pSource ) =>
{
  // Get the prop's parent record
  const record = useRecordContext( pSource );
  const lColor = record && record.color || ''; // Set color to empty if record is null
  return (
    <div>
      <span style={{display:'block',minWidth:'65px'}}>{lColor}</span>
      <div style={{display:'block',height:'8px',backgroundColor:lColor}}></div>
    </div>
  );
};


// Used for role field and input
const choices = [
   { id: 'admin', role: 'admin' },
   { id: 'user', role:  'user' }
];


// Return a <span> containing text converted from an array
const RolesField = ( source ) =>
{
  // Get the prop's parent record
  const record = useRecordContext( source );
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
      <ColorField source="color" />
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
      // errors.email = 'Email is required';
      errors.email = 'ra.validation.required';
  }
  if (!values.color) {
      // You can return translation keys
      errors.color = 'ra.validation.required';
  }
  return errors;
}


export const TeacherEdit = () => (
  <Edit title="Edit Teacher">
    <SimpleForm warnWhenUnsavedChanges validate={validateEditForm}>
      <NumberInput disabled source="id" />
      <TextInput source="email" />
      <TextInput source="color" type="color" sx={{minWidth:75}}/>
      <SelectArrayInput source="roles" choices={choices} optionValue="role" optionText="role" />
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="initials" />
      <TextInput source="phone" />
      <BooleanInput source="hide" defaultChecked={false} />
    </SimpleForm>
  </Edit>
);


const validateCreateForm = (values) =>
{
  const errors = {};
  if (!values.email) {
      errors.email = 'ra.validation.required';
  }
  if (!values.password) {
      errors.password = 'ra.validation.required';
  }
  if (!values.color) {
      errors.color = 'ra.validation.required';
  }
  return errors;
}


export const TeacherCreate = () => (
  <Create title="Register New Teacher">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm}>
      <TextInput source="email" inputProps={{ autocomplete: 'off' }} defaultValue={""} />
      <PasswordInput source="password" inputProps={{ autocomplete: 'new-password' }} defaultValue={""} />
      <TextInput source="color" type="color" sx={{minWidth:75}} defaultValue="#888888"/>
      <SelectArrayInput source="roles" choices={choices} optionValue="role" optionText="role" />
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="initials" />
      <TextInput source="phone" />
      <BooleanInput source="hide" defaultChecked={false} />
    </SimpleForm>
  </Create>
);
