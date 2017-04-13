**VennSchedule** - a schedule polling webapp showcasing "vanilla" JavaScript DOM traversal and manipulation.

Note: This app has been tested in Chrome, Firefox, and Safari. Let me know if you encounter issues in other browsers. Also, this app is still a work in progress! Check my active branches to see my most current work.

**To run this app locally:**

Clone the repository, and in the command line, run `npm i` to install the necessary dependencies for running the backend. Then you can run `node server.js` to start the server.

The backend portion of the app is an in-memory Node/Express API. Data will persist as long as the server is running and the data is not modified or deleted via REST verbs. The API returns data as JSON. The only resource is "Attendee," which represents a person taking an availability poll. This resource has two keys: `name`, which must be a string, and `availability`, which must be an array of objects, which in turn consist of numbered `option` keys paired with boolean values.

The API URL endpoints are `/api/attendee`, and `/api/attendee/param`, where "param" is a number representing a unique attendee id.

Once the server is running, you can can open the local version of the `webapp/index.html` file in your favorite browser and interact with the program. The front-end JavaScript interacts with the API via ajax, and you can create and edit entries, refresh the page, and your data will persist as long as the API Node server is running.
