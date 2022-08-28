import { Edit, SimpleForm, NumberInput, TextInput, TimeInput, BooleanInput, ReferenceInput, AutocompleteInput } from 'react-admin';

export const ClassEdit = () => (
  <Edit title="Edit Class">
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="shortName" />
      <ReferenceInput source="school" label="shortName" reference="schools">
        <AutocompleteInput label="Name" />
      </ReferenceInput>
      <TextInput source="blog" />
      <BooleanInput source="hide" parse={v => v ? 1 : 0} format={ v => v != 0}/>
      <TimeInput source="defaultStartTime" />
      <TimeInput source="defaultEndTime" />
      <TextInput source="defaultInvoiceItem" />
      <NumberInput source="defaultHoursPerDay" />
    </SimpleForm>
  </Edit>
);
