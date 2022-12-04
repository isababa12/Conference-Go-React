import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import PresentationForm from './PresentationForm';
import AttendConferenceForm from './attend-conference'

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
    <Nav />
    <div className="container">
    {/* <LocationForm /> */}
    {/* <ConferenceForm /> */}
    {/* <PresentationForm/> */}
    <AttendConferenceForm/>
      {/* <AttendeesList attendees={props.attendees} /> */}
    </div>
    </>
  );
}

export default App;
