**VennSchedule** - a schedule polling webapp showcasing "vanilla" JavaScript DOM traversal and manipulation.
Visit the deployed version of this project at https://vennschedule.herokuapp.com

Note: This app has been tested in Chrome, Firefox, and Safari. Let me know if you encounter issues in other browsers. Also, this app is still a work in progress! Check my active branches to see my most current work.

**To run this app locally:**

Clone the repository, and in the command line, run `npm i` to install the necessary dependencies for running the backend. Then you can run `node server.js` (or `npm start`) to start the server.

The backend portion of the app is an in-memory Node/Express API. Data will persist as long as the server is running and the data is not modified or deleted via REST verbs. The API returns data as JSON. The only resource is "Attendee," which represents a person taking an availability poll. This resource has two keys: `name`, which must be a string, and `availability`, which must be an array of objects, which in turn consist of numbered `option` keys paired with boolean values.

The API URL endpoints are `/api/attendee`, and `/api/attendee/param`, where "param" is a number representing a unique attendee id.

Once the server is running, you can can open http://localhost:8080 in your favorite browser and interact with the program. The front-end JavaScript interacts with the API via ajax, and you can create and edit entries, refresh the page, and your data will persist as long as the API Node server is running.

**Note on the deployed version:**
Although there is no front-end UI feature (yet!) for deleting an attendee record, it can be done by making a DELETE request directly to the API using curl, httpie, or a GUI like Postman. First, in a standard web browser, you can view the raw data for attendees by entering the URL https://vennschedule.herokuapp.com/api/attendee. This will allow you to see the numeric ID associated with each attendee object. Then, when you make your delete request, you can use the id of the attendee object you wish to delete as a param in the URI.

Say you want to delete the attendee with the id "1."
Your curl command would be `curl -X "DELETE" https://vennschedule.herokuapp.com/api/attendee/1`.
