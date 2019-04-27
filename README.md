# Spaceships

A multiplayer shooter powered by Phaser 3. Players connect to a game instance and battle eachother with linearly fired projectiles.

[Check out the backend repository](https://github.com/patcarrasco/spaceships-backend).


[![spaceships](https://user-images.githubusercontent.com/39533889/56827433-cd13fe00-682c-11e9-855e-7455e025c121.png)](
https://drive.google.com/file/d/1saxQyMzbfyaby-sUblQyHt_a6KiAnoDa/view?usp=sharing)

## Technologies
Created with:
* [Phaser 3](https://phaser.io/phaser3) - Game engine and logic 
* [Rails](https://rubyonrails.org/) - User location data storage, Action Cable to relay information to connected users
* [PostgreSQL](https://www.postgresql.org/) - Database
* [Semantic UI](https://semantic-ui.com/) - Landing page sign in/sign up  

## Installation

Clone this repository and the [backend](https://github.com/patcarrasco/spaceships-backend).

Frontend
```javascript
npm i && http-server
```

Backend
```ruby
bundle install
rails s
```
