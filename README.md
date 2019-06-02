# SWAPI Rails App

### Description

Produce a UI for the Star Wars API built using Ruby on Rails. [Live Site](https://swapi-test.herokuapp.com)

### Goal

Consume film and character information from SWAPI and display it in a clean, performant user interface.

### Acceptance criteria

- Home screen contains a list of films pulled from the SWAPI
- List should be searchable
- Films can be favourited, this state should be persisted using local storage
- Favourited films should appear at the top of the list
- A stylised user prompt/alert should show when a film is favourited
- Favourited films can be unfavourited
- Film list items can be clicked to show individual film page
- Film page should show all the information pulled from the SWAPI endpoint for an individual film
- Film page should contain a back to home link
- The list of characters should display a tooltip when a list item is hovered
- The tooltip should show the character's bio pulled from the SWAPI endpoint for people
- Provide public GitHub repo to source code
- Host the finished project on Heroku, Surge or similar
- This test is focused on demonstrating Ruby on Rails, do not sweat the styling too much and feel free to use a framework like Bootstrap or similar
- Bonus points (not required)
- Use the tooltip UI to show additional information pertaining to the film like vehicles, spaceships etc
- Demonstrate creative and performant ways of fetching information from SWAPI
- Provide a documented readme inside the GitHub repo explaining the technology used, the setup process and other relevant information

### Setup process

```
git clone https://github.com/dav-armour/swapi.git
cd swapi
bundle install
rails s
```

## Gems used

- bootstrap: Allows use of bootstrap for styling
- jquery-rails: Dependency of bootstrap
- httparty: Used for sending http requests to api
- parallel: Used to speed up api calls
