import { Datagrid, SimpleForm, List, EditButton, Edit, Create } from 'react-admin';
import { TextField, BooleanField } from 'react-admin';
import { TextInput, BooleanInput, PasswordInput, SelectArrayInput } from 'react-admin';
import { useRecordContext } from 'react-admin';
import { Box } from '@mui/material';


const Separator = () => <Box pt="1em" />;


// Used for role field and input
const choices = [
   { id: 'admin', role: 'admin' },
   { id: 'user', role:  'user' }
];


// Returns a combined div containing the record's color value and a colored bar under the text
const ColorField = pSource =>
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


// Return a <span> containing text converted from an array
const RolesField = source =>
{
  // Get the prop's parent record
  const record = useRecordContext( source );
  return record ? <span>{ Object.values( record.roles ).join(',') }</span> : null;
};


const validateEditForm = values =>
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


const validateCreateForm = values =>
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


const colorFormatter = pValue =>
{
  if ( typeof pValue === 'string' && pValue.startsWith( '#' ) && pValue.length == 4 )
  {
    pValue = '#' + pValue.slice( 1 ).split( '' ).map( val => `${val}${val}` ).join( '' );
  }
  return pValue;
}


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


export const TeacherEdit = () => (
  <Edit title="Edit Teacher">
    <SimpleForm warnWhenUnsavedChanges validate={validateEditForm} sx={{ maxWidth: 500 }}>
      <TextInput source="email" inputProps={{ autocomplete: 'off' }} defaultValue={""} fullWidth />
      <Separator />
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1.75} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="firstname" fullWidth />
        </Box>
        <Box flex={1.75} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="lastname" fullWidth />
        </Box>
        <Box flex={0.75} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="initials" />
        </Box>
      </Box>
      <TextInput source="phone" />
      <Separator />
      <TextInput source="color" type="color" sx={{minWidth:75}} defaultValue="#888888" format={colorFormatter} />
      <SelectArrayInput source="roles" choices={choices} optionValue="role" optionText="role" />
      <BooleanInput source="hide" defaultChecked={false} />
    </SimpleForm>
  </Edit>
);


export const TeacherCreate = () => (
  <Create title="Register New Teacher">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm} sx={{ maxWidth: 500 }}>
      <TextInput source="email" inputProps={{ autocomplete: 'off' }} defaultValue={""} fullWidth />
      <PasswordInput source="password" inputProps={{ autocomplete: 'new-password' }} defaultValue={""} fullWidth />
      <Separator />
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1.75} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="firstname" fullWidth />
        </Box>
        <Box flex={1.75} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="lastname" fullWidth />
        </Box>
        <Box flex={0.75} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="initials" />
        </Box>
      </Box>
      <TextInput source="phone" />
      <Separator />
      <TextInput source="color" type="color" sx={{minWidth:75}} defaultValue="#888888"/>
      <SelectArrayInput source="roles" choices={choices} optionValue="role" optionText="role" />
      <BooleanInput source="hide" defaultChecked={false} />
    </SimpleForm>
  </Create>
);
