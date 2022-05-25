# IRIS - Instant Response Immediate Support

# Problem Statement
Not every 911 call is a true emergency.

Emergency Response Systems become unnecessarily burdened with non-emergent cases.

First Responders and critical equipment get diverted from real emergencies.

Potential delay in care for emergent, life-threatening cases.

# Business Idea

IRIS attempts at connecting low-acuity 911 callers with primary care resources within the community.

A digital solution to triage non-emergency complaints through immediate telehealth support with instantly available and qualified emergency physicians.

IRIS eligible patients to be schedule either for primary care physician along with arranged transport other than ambulance, local voluntary clinicians, or home care prescribed by physician.

<br>

# Domain Model

## Data Model: 
![alt text](https://github.com/neu-mis-info6150-spring-2022/final-project-iris/blob/main/Resources/Diagrams/Ecosystem_Model.png?raw=true) <br>
## Use Case Diagram: 
![alt text](https://github.com/neu-mis-info6150-spring-2022/final-project-iris/blob/main/Resources/Diagrams/IRIS%20Use%20case%20diagram.png?raw=true)

# User Stories
1. User Administration - 8 roles - 911 Dispatcher, 911 Physician, First Responders - Police, Fire, Paramedic, HealthCare Staff Administrator, Voluntary Clinician, and Voluntary Driver.
	- Login Module for each role including System Administrator
    - Signup for Voluntary Roles
	- CRUD operations on User Profiles

2. Life Threatening Emergencies - Level A
	- Incoming Calls Module + Dispatcher Caller History
    - Request Acknowledgement by First Responders
	- Caller Transfer to Hospital

3. Google Maps API Integration
	- First Responders
	- Caller Geolocation Mapping

4. IRIS Eligible Emergencies - Level C
	- Physician's Assessment

5. Audio/Video Conferencing

6. Non-Emergent Calls - Level E
	- Voluntary Clinician's Assessment
    - Request Acknowledgement by Voluntary Organization Drivers
