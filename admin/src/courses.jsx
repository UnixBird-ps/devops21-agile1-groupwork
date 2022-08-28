import { Datagrid, SimpleForm, List, Edit, Create, ReferenceInput, AutocompleteInput, TextField, NumberField, BooleanField, TextInput, NumberInput, DateInput, BooleanInput } from 'react-admin';

export const CourseList = () => (
  <List hasCreate={true}>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <TextField source="class" />
      <NumberField source="points" />
      <TextField source="startDate" />
      <TextField source="endDate" />
      <TextField source="plan" />
      <TextField source="invoiceItem" />
      <NumberField source="hoursPerDay" />
      <BooleanField source="hide" looseValue={true} />
    </Datagrid>
  </List>
);

export const CourseEdit = () => (
  <Edit title="Edit Course">
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput source="class" label="shortName" reference="classes">
        <AutocompleteInput label="Class" />
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
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput source="class" label="shortName" reference="classes">
        <AutocompleteInput label="Class" />
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
  </Create>
);
