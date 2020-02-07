# Noteful Client

See: https://reacttraining.com/react-router/
1. npm install react-router-dom
2. Open your ./src/index.js file, import the BrowserRouter component from 'react-router-dom' and wrap it around your whole App
3. BrowserRouter component adds the capabilities of React Router to your web application
4. Link component will use a browser feature and some JavaScript to "pretend" to do a complete page load. 
    - Link component doesn't work with the href prop, instead, we use the to prop
5. History is another library of react-router
    - use history to do various things such as subscribing to navigation changes, checking how many navigation events have taken place, and programmatically navigating
    - can access History via props on the Router component
    - The function we give to the render prop is given a parameter called "Route-props".
    - Route props has keys for match, location and history
        - we can destruct the history key out of the route props when describing the function parameters like so: render={({ history }) => {
        - gives us the history object directly to one of the routes
    - To programmatically navigate, the history object provides a method called push
        - push can be used to navigate to a new page
6. Higher order components are functions we can pass our components into, they often allow us to inject new props into a component
    -withRouter is an HOC
    - "import { withRouter } from 'react-router-dom';" to use
    - wrap the component inside this HOC (pass the component into the HOC as an argument and export the result)
        - i.e. "+export default withRouter(AddBookmark);" use this to make history a prop for a component (ex. AddBookmark)

Summary:
* wrap your entire web client application in a BrowserRouter component to enable React Router features and then setup Routes that display components at certain paths.
* use link components in place of <a> or <button> components in order to trigger navigation to different paths which display different routes
* possible to trigger navigation programmatically by using the history object
* history object contain a push method for triggering navigation or a goBack method for navigating to the previous page

* Programmatic navigation is useful for navigating after events or in certain conditions such as a successful API response is received or the user is not logged in so they don't have permission to view that route

Requirements
1. Refactor your Noteful application to use context instead of prop-drilling.
2. Implement two fetch requests to two endpoints when the application mounts: /folders and /notes. Store the response from these requests using a setState in whichever component you were keeping your dummy state.
3. Implement the delete button for each note in the list in the main route and folder route.
4. Implement the delete button on the note page, if the delete is successful, redirect to the / path.
5. The API calls will be made to a local server called noteful-json-server that you'll need to have running separately to your noteful React application.
