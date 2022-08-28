import { Datagrid, List, TextField, NumberField, DateField, BooleanField } from 'react-admin';

export const CourseList = () => (
    <List>
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
            <BooleanField source="hide" />
        </Datagrid>
    </List>
);
