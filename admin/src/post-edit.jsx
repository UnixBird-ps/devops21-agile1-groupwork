import { Edit, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const PostEdit = () => (
  <Edit title="Edit post">
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
);