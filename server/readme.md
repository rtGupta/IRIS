# IRIS Backend

The IRIS backend is built in Node JS and Express to construct JSON-based RESTful services for handling the request workflow between different users of the system and manage user database.

## Emergencies - Level A, C, and E
The ER controller manages the requests to handle different emergencies that comes through the dispatcher.

1. POST /requests - registers a new emergency in the system recording the caller's details, date and time of the emergency, sender's and receivers information.

2. GET /requests - fetches all the requests from the database.

3. PUT /requests - updates the receivers, status, and the resolve date and time for that emergency.


