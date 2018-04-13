# City Liver

> Pithy project description

## Team

  - __Product Owner__: Tom Wagner
  - __Scrum Master__: David Baek
  - __Development Team Members__: Wei Gao, Ryan Schabel

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)


## Usage

> Click the buttons to render the US cities that match your filters.

src/index.jsx
Contains the App 
State contains cities: array, favorites:array, showFavorites: boolean

Functions: 
getCities - sends request to app.('/cities') sends first argument (state) as 'params' as a get request to /cities endpoint. The results should be the filtered cities from the db. 
The cb in '.then' sets state of cities: to the cities from the response.

getWeather - gets weather data for each city in this.state.cities


server/index.js
app.get(/cities) - queries the db based on the state passed to it as params passed to it.
functions:
makeQueryString - creates query string based on filters selected/state passed to it. {"$and": {"$or" [{},{}]}}. Console log and view mongodb docs on '$and' and '$or' for more info. 
The database is hand-written and holds all city information EXCEPT for weather data.
Sends data back to src/index.jsx app.get('/cities')


## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
