VennSchedule - a schedule polling webapp showcasing "vanilla" JavaScript DOM traversal and manipulation.

NOTE: This app (and README doc) is in progress... Progress has been made, but there are still some rough edges and work to do on the front end. Check back soon for updates.

To run the "full-stack" version of this app, clone the repository and switch to the "backend" branch (you may need to run `git fetch` in the command line before you're able to switch to the branch).

Navigate into the "backend" directory, and in the command line, run `npm i` to install the necessary dependencies for running the backend. Then you can run `node server.js` to start the server.

The backend portion of the app is an in-memory Node/Express API. Data will persist as long as the server is running and the data is not modified or deleted via REST verbs. The API returns data as JSON. The only resource is "Attendee," which represents a person taking an availability poll. This resource has two keys: `name`, which must be a string, and `availability`, which must be an array of objects, which in turn consist of numbered `option` keys paired with boolean values.

The API URL endpoints are `/api/attendee`, and `/api/attendee/param`, where "param" is a number representing a unique attendee id.

Once the server is running, you can can open the local version of the `app/index.html` file in your favorite browser and interact with the program. The front-end JavaScript interacts with the API via ajax, and you can create and edit entries, refresh the page, and your data will persist as long as the API Node server is running.
