import { List, Datagrid, SimpleForm, Edit, Create, } from 'react-admin';
import { ReferenceField, TextField, NumberField, BooleanField } from 'react-admin';
import { EditButton, ReferenceInput, AutocompleteInput, TextInput, NumberInput, DateInput, BooleanInput, SelectInput } from 'react-admin';


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
  if (!values.class) {
      // You can return translation keys
      errors.class = 'ra.validation.required';
  }
  if (!values.invoiceItem) {
      // You can return translation keys
      errors.invoiceItem = 'ra.validation.required';
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
      <TextField source="invoiceItem" />
      <NumberField source="hoursPerDay" />
      <BooleanField source="hide" looseValue={true} />
      <EditButton />
    </Datagrid>
  </List>
);


export const CourseEdit = () => (
  <Edit title="Edit Course">
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput source="class" reference="classes">
        <SelectInput source="name" optionText="name" />
      </ReferenceInput>
      <NumberInput source="points" />
      <DateInput source="startDate" />
      <DateInput source="endDate" />
      <TextInput source="plan" />
      <ReferenceInput source="id" reference="invoices">
        <AutocompleteInput label="Invoice" />
      </ReferenceInput>
      <NumberInput source="hoursPerDay" />
      <BooleanInput source="hide" parse={v => v ? 1 : 0} format={ v => v != 0} />
    </SimpleForm>
  </Edit>
);


export const CourseCreate = () => (
  <Create title="Register New Course">
    <SimpleForm validate={validateCreateForm}>
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput source="class" reference="classes">
        <SelectInput source="name" optionText="name" />
      </ReferenceInput>
      <NumberInput source="points" />
      <DateInput source="startDate" />
      <DateInput source="endDate" />
      <TextInput source="plan" />
      <NumberInput source="invoiceItem" />
      {/* <ReferenceInput source="invoiceItem" reference="invoice_items">
        <AutocompleteInput label="Invoice" />
      </ReferenceInput> */}
      <NumberInput source="hoursPerDay" />
      <BooleanInput source="hide" defaultChecked={false} defaultValue={0} parse={v => v ? 1 : 0} format={ v => v != 0} />
    </SimpleForm>
  </Create>
);
