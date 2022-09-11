// in src/App.js
import * as React from "react";
import { Admin, Resource } from 'react-admin';
// Import React-Admin's Simple REST API Provider instead of the tutorial's JSON Provider
import simpleRestProvider from 'ra-data-simple-rest';
// Import our REACT classes
import Dashboard from "./dashboard";
import { TeacherList, TeacherEdit, TeacherCreate } from './teachers';
import { ClassList, ClassEdit, ClassCreate } from './classes';
import { CourseList, CourseEdit, CourseCreate } from "./courses";
import { SchoolList, SchoolEdit, SchoolCreate } from "./schools";
import { InvoiceItemList, InvoiceItemEdit, InvoiceItemCreate } from "./invoiceitems";
// Get some icons from the MUI Icon library
import { Person as UserIcon, Group as GroupIcon, Lightbulb as CourseIcon, School as SchoolIcon, ReceiptLong as InvoiceIcon } from '@mui/icons-material';
// The REST API is local and lives at /data
const dataProvider = simpleRestProvider('/data');

// Define React-Admin resources
const App = () => (
   <Admin dataProvider={dataProvider} dashboard={Dashboard} disableTelemetry>
      <Resource name="teachers" list={TeacherList} edit={TeacherEdit} create={TeacherCreate} icon={UserIcon} />
      <Resource name="classes" list={ClassList} edit={ClassEdit} create={ClassCreate} icon={GroupIcon} />
      <Resource name="courses" list={CourseList} edit={CourseEdit} create={CourseCreate} icon={CourseIcon} />
      <Resource name="schools" list={SchoolList} edit={SchoolEdit} create={SchoolCreate} icon={SchoolIcon} />
      <Resource name="invoice_items" list={InvoiceItemList} edit={InvoiceItemEdit} create={InvoiceItemCreate} icon={InvoiceIcon} />
   </Admin>
);

export default App;
