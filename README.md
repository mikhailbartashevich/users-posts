# General notes

Spent on this app ~8 hours in total
4 hours were not enough mostly because of reading docs for material-ui
and some new breaking changes in the latest versions of react-router

Didn't spend much time on making loading and error states beautiful, they are just handled according to the react-query states
Could be spend more time for extracting reusable pagination logic into hooks and adding more components-helpers
Tests could be more safisticated

Limit param is not working properly in the api as it ignores params with values less than 5
So comments section was cut manually on UI side

Used following libs: react-query, react-router, axios and material-ui

Offline experience is implemented using react-query cache adapter
Tests are done using react-testing-library

If you have any of this issues please follow the instuctions

https://stackoverflow.com/questions/62246824/error-err-package-path-not-exported-no-exports-main-resolved-in-app-node-m

rm yarn.lock
yarn install

# To run the project:

### `export NODE_OPTIONS=--openssl-legacy-provider`

### `yarn install`
### `yarn start`

# To run the tests:

### `yarn tests`
