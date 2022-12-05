import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import PresentationForm from './PresentationForm';
import AttendConferenceForm from './attend-conference';
import MainPage from './MainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="locations">
              <Route path="new" element={<LocationForm/>} />
            </Route>
            <Route path="conferences">
              <Route path="new" element={<ConferenceForm/>} />
              {/* <Route path="attend" element={<AttendConferenceForm />} /> */}
            </Route>
            <Route path="presentations">
              <Route path="new" element={<PresentationForm/>} />
            </Route>
            <Route path="attendees">
              <Route path="list" element={<AttendeesList attendees={props.attendees}/>} />
            </Route>
          </Routes>
          {/*

          <LocationForm />
          <ConferenceForm />
          <PresentationForm/>
          <AttendConferenceForm/>
          <AttendeesList attendees={props.attendees} />
          */}
    </BrowserRouter>
  );
}

export default App;
