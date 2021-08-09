# Mini Project -- Student Management

/login
/admin

/admin/*
/admin/students
/admin/dashboard

** CLICK LOGIN 
- Call API to login
- Success -> redirect ADMIN
- FAILED -> show ERROR

Create Auth Saga to handle:

LOOP
- if user logged in, watch LOGOUT
- else watch LOGIN

LOGIN: 
- Call API to get access token + user info
- Set access token to local storage
- Rediect to Admin Page

LOGOUT:
- Remove access token from local storage
- Redirect to Login Page

authSlice : define action, reducer
authSaga: define effect 
-------------------------------------------------------
Different ways to navigation in redux saga

1/ watch redux store and make redirect on component
Idea : 
- create a flag in state
- Inside component, get flag from state and following the value of flag to set redirect using useEffect
-> Flow is fragmented, hard to control when you have more and more state 

2/ ussing callback 

Ex: 
const function App(){
    const dispatch = useAppDispatch();

    const handleLoginSubmit = (value) => {
        dispatch(authActions.login({
            ...value,
            onSuccess: () => history.push('/admin'),
            onError: () => console.log('error')
        }))
    }
}
-> this approach using non-serializable (callback) in action and dispatch to redux store
which is NOT RECOMMENDED in redux/toolkits -- in redux/toolkits when check default middleware , it not accept any non-serializable value

3/ using connected-react-router
- Sync routing to redux
- Navigatin by dispatch an action in redux store
-- NOTE : 1 thing make sure, when route changes, it doesn't cause re-render irrelevant component
-> Lib: connected-react-router + custom history

-------------------------------------------------------------------------
# Handle loading / error in redux saga 

LOADING: can based on redux store
ERROR: eliminate the usage as much as u can

about ERROR (consideration):  
- Trigger error toast from Saga
- Consider to call API directly on component instead of going through Saga 

-------------------------------------------------------------------------

### Student


ROUTINGS:
- admin/students : listing
- admin/students/add : add new student
- admin/student/:student : update a student

LISTING: 
- Search by name
- Filter by city 
- Sort by name, mark
- Pagination

+ Student slice state
- loading
- list
- filter {_page, _limit, ...}
- pagination

ADD/EDIT
- React Hook Form v7
- Yup

Student Form
- Mode : Add/Edit
- Initial Values
- Values : 
    + name: Text Input
    + age: Number Input
    + gender: Radio Options
    + city: Select
    + mark: Number Input
- Validations :
    + name: at least 2 words
    + age: >= 18
    + gender: male/female
    + city: required
    + mark: 0 -> 10
- Submission: redirect to student list page after submitting successsfully.
