// in src/App.js
import * as React from "react";
import { Admin, Resource, ListGuesser, fetchUtils, EditGuesser, List } from 'react-admin';
import Dashboard from "./Dashboard";
import { TeacherList } from './teachers';
import { TeacherEdit } from './teacher-edit';
import { ClassList } from './classes';
import { ClassEdit } from './class-edit';
import { CourseList } from "./courses";
import { CourseEdit } from "./course-edit";
import { SchoolList} from "./schools";
import { SchoolEdit} from "./school-edit";
import jsonServerProvider from 'ra-data-json-server';
import simpleRestProvider from 'ra-data-simple-rest';
// import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// const dataProvider = jsonServerProvider('/data');
const dataProvider = simpleRestProvider('/data');

const App = () => (
   <Admin dataProvider={dataProvider} dashboard={Dashboard} disableTelemetry>
      <Resource name="teachers" list={TeacherList} edit={TeacherEdit} icon={UserIcon} />
      <Resource name="classes" list={ClassList} edit={ClassEdit} />
      <Resource name="courses" list={CourseList} edit={CourseEdit} />
      <Resource name="schools" list={SchoolList} edit={SchoolEdit} />
      {/* <Resource name="users" list={UserList} create={PostCreate} icon={UserIcon} /> */}
   </Admin>
);

export default App;
