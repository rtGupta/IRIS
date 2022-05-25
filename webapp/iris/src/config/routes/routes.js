import {
  Routes,
  Route,
} from "react-router-dom";
import React from "react";
import DispatcherIncomingCalls from "../../pages/dispatcher-incoming-calls";
import CallHistory from "../../pages/call-history";
import DispatchRequest from "../../pages/dispatch-request";
import FirstResponderHome from "../../pages/first-responder";
import Login from '../../pages/login';
import NewUser from '../../pages/new-user';
import HospitalHome from "../../pages/hospital";
import ChangePassword from "../../pages/changePassword";
import SystemAdmin from '../../pages/systemAdmin';
import Video from '../../pages/jitsi-meeting';
import MedicalHistory from "../../pages/medical-history";
import PhysicianHome from "../../pages/physician";

/**
* All Routes Defined here
*/
function R() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<NewUser />} />
      <Route path="/dispatcherIncomingCalls" exact element={<DispatcherIncomingCalls />} />
      <Route exact path="/callHistory" element={<CallHistory />} />
      <Route exact path="/dispatchRequest" element={<DispatchRequest />} />
      <Route exact path="/firstResponder" element={<FirstResponderHome />} />
      <Route exact path="/physician" element={<PhysicianHome />} />
      <Route exact path="/hospital" element={<HospitalHome />} />
      <Route exact path="/changePassword" element={<ChangePassword />} />
      <Route exact path="/systemAdmin" element={<SystemAdmin />} />
      <Route exact path="/meeting" element={<Video />} />
      <Route exact path="/medical-history" element={<MedicalHistory />} />
    </Routes>
);
}

export default R;