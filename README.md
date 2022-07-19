# Fisherman Full Stack Project


## Submission Instructions
1. Read all instructions before starting
2. Clone repository to local machine
3. Checkout a feature branch called `feature/brewery_app`
4. Get Base Apps running
5. Start developing brewery application
6. Commit and push changes to your feature branch
7. Create a PR from your feature branch into master once you are done
8. Detail what changes you have made in your PR description


## Prerequisites
Please ensure that you follow best practices to install the following on your development computer.
1. Pipenv (https://pipenv.pypa.io/en/latest/install/)
2. Yarn (https://classic.yarnpkg.com/lang/en/docs/cli/install/)


## Brewery App
### Prepare
1. You are provided with a Django app in `/backend` and a React app in `/app`
2. You will be connecting the React app to the Django app using REST calls
3. There is no need to implement authentication
4. This app will allow users to find breweries close to a location using [Open Brewery API](https://www.openbrewerydb.org/)
5. US Capital information is available to serve in `backend/breweries/constants.py`


### Getting Base Apps Started
1. `cd app` > `yarn` > `PORT=8001 yarn start`
2. `cd backend` > `pipenv install` > `pipenv shell` > `python manage.py runserver`


### Requirements
1. When React app loads, fetch US States from Django and display a selector with the returned state information
2. When a state is chosen fetch the 10 closest breweries to the state's capital
3. Display breweries in a list or table below the selector
4. Calculate distance (in miles) between brewery and the state capital
5. Store user requests from the browser in the sqllite datastore
6. Ensure any models you create are editable in the Django admin site
7. Allow for filtering breweries by brewery type (https://www.openbrewerydb.org/documentation#by_type)


### Extra Credit (Optional)
- Choose a React component library that you are familiar with to build the React app UI
- Paginate results and add pagination controls using a `per_page` value of 10
- Implement search (https://api.openbrewerydb.org/breweries/search?query={search})
- Calculate distance from your browser's location
- Add a feature of your choice that you think will improve the app


### Rubric
| Category      | Description                                                                                                                     | Weight |
| ----------- |---------------------------------------------------------------------------------------------------------------------------------|--------|
| Completeness   | The solution meets the specified criteria. All requested features are implemented.                                              | 40     |
| Design   | The solution is elegant, efficient, uses non-repetitive code, and utilizes common design patterns in both React and Django.	 | 20     |
| Technique   | The code is easy to read, variables are well named, file structure is organized, and documentation is provided where necessary.	 | 20     |
| Process   | Proper utilization of VCS, commits are frequent, atomic, and well described.                                                    | 20     |


### App Documentation

Phase Completed:

Extra Feature:
