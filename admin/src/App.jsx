
// in src/App.js
import * as React from "react";
import { Admin, Resource, ListGuesser, fetchUtils, EditGuesser, List } from 'react-admin';
import { TeacherList } from './teachers';
import { ClassList } from './classes';
import { CourseList } from "./courses";
import { CourseEdit } from "./course-edit";
import { SchoolList } from "./schools";
import jsonServerProvider from 'ra-data-json-server';
import simpleRestProvider from 'ra-data-simple-rest';
// import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import Dashboard from "./Dashboard";
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// const dataProvider = jsonServerProvider('/data');
const dataProvider = simpleRestProvider('/data');


const App = () => (
   <Admin dataProvider={dataProvider} dashboard={Dashboard} disableTelemetry>
      <Resource name="teachers" list={TeacherList} edit={EditGuesser} icon={UserIcon} />
      <Resource name="classes" list={ClassList} edit={EditGuesser} />
      <Resource name="courses" list={CourseList} edit={CourseEdit} />
      <Resource name="schools" list={SchoolList} edit={EditGuesser} />
      {/* <Resource name="users" list={UserList} create={PostCreate} icon={UserIcon} /> */}
   </Admin>
);

export default App;
