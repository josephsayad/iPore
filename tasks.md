# Tasks To Complete

* Integrate Redux for the Dashboard component. We'll want the user to be able to: 
  
  1: logout [x]
  2: specify input files paths & add a run [x]
  3: pipelines can't be the same name, give error [x]
  4: pipelines should be children of user, or be referenced by user [x]

* When adding a run, react-native should send request to the intel compute stick. 
  The intel compute stick should start the pipeline [ ]

* Watcher should detect end of pipeline run, and then populate the users run []. 
  When sending over a request, the user should be specified. This way, watcher 
  will know which user to add to [ ]

* The server should be ready to handle POST requests and GET request made for 
  run data. POST is to create and GET is for react-native render [ ]

## Note

* We pipe user data from the AuthReducer, which authenticates and temporarily stores the information, until logout! The UserReducer is only relevant during this time, and we can cast actions, and render data. WE get user from auth, NOT user from user. 

  runs: {
    type: [
      {
        name: { type: String },
        state: { type: String }
      }
    ]
  } @User

ON   3: pipelines can't be the same name, give error [ ]

* Route to pipeline names [x]
* @/actions/async/pipeline name check before POST []