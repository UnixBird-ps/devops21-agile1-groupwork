import { Edit, ReferenceInput, AutocompleteInput, SelectInput, SimpleForm, TextInput, NumberInput, DateInput, BooleanInput } from 'react-admin';

export const CourseEdit = () => (
    <Edit title="Edit kurs">
        <SimpleForm>
            <NumberInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="shortName" />
            <ReferenceInput source="class" label="shortName" reference="classes">
                <AutocompleteInput label="Class" />{/* shortName */}
            </ReferenceInput>
            {/* <TextInput source="class" /> */}
            <NumberInput source="points" />
            <DateInput source="startDate" />
            <DateInput source="endDate" />
            <TextInput source="plan" />
            <ReferenceInput source="id" reference="invoices">
                <AutocompleteInput label="Invoice" />{/* shortName */}
            </ReferenceInput>
            {/* <TextInput disabled source="invoiceItem" /> */}
            <NumberInput source="hoursPerDay" />
            <BooleanInput source="hide" parse={v => v ? 1 : 0} format={v => v == 1} />
        </SimpleForm>
    </Edit>
);