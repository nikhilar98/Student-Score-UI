<!-- @format -->

Instructions to run the app locally.

git clone https://github.com/nikhilar98/Student-Score-UI<br/>
cd student-score-ui<br/>
npm install<br/>
npm start<br/>

Live Link : https://student-score-ui.vercel.app/

Assumptions : User can add/edit/delete records that contain information of a student like his/her name,address,score. The pass/fail status is calculated from the score entered and displayed on UI. A dashboard displays the statistics of all the students scores.

Decisions:
-The state of the application is managed using React's useReducer Hook as it's better suited for managing complex data types. The state(data) and dispatch function are passed down to all the child components using React's useContext API, so they can directly access them. react-router-dom is used for routing.
-react-chartkick with chart.js is used as 3rd party package for implementing charts.
-Material UI along with vanilla CSS is used for styling the UI.
