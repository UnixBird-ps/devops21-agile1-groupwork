import { Datagrid, SimpleForm, List, Edit, Create } from 'react-admin';
import { NumberField, TextField, EditButton, TextInput, NumberInput } from 'react-admin';


const validateCreateForm = (values) =>
{
  const errors = {};
  if ( !values.title )
  {
      // errors.title = 'title is required';
      errors.title = 'ra.validation.required';
  }
  if ( !values.unit )
  {
      errors.unit = 'ra.validation.required';
  }
  if ( !values.netPrice )
  {
      // errors.netPrice = 'netPrice is required';
      errors.netPrice = 'ra.validation.required';
  }
  return errors;
}


export const InvoiceItemList = () => (
  <List title="Invoice Items">
    <Datagrid>
      <NumberField source="id" />
      <TextField source="title" />
      <TextField source="unit" />
      <NumberField source="netPrice" />
      <EditButton />
    </Datagrid>
  </List>
);


export const InvoiceItemEdit = () => (
  <Edit title="Edit Invoice Item">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm}>
      <NumberInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="unit" />
      <NumberInput source="netPrice" defaultValue={0} min={0} />
    </SimpleForm>
  </Edit>
);


export const InvoiceItemCreate = () => (
  <Create title="Register New Invoice Item">
    <SimpleForm warnWhenUnsavedChanges validate={validateCreateForm}>
      <TextInput source="title" />
      <TextInput source="unit" />
      <NumberInput source="netPrice" defaultValue={0} min={0} />
    </SimpleForm>
  </Create>
);
