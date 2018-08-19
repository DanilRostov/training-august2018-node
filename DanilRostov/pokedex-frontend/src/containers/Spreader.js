import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PokemonsList from '../components/PokemonsList';
import PokemonsCatched from '../components/PokemonsCatched';
import PokemonPage from '../components/PokemonPage';

export default class Spreader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catchedPokemons: [],
      catchedIds: [],
      loadedPokemons: [],
    }
  }

  handleCatched = (pokemons, pokemon, date) => {
    const { catchedPokemons, catchedIds } = this.state;
    pokemon.dateOfCatching = date;
    this.setState({
      catchedPokemons: catchedPokemons.concat(pokemon),
      catchedIds: catchedIds.concat(pokemon.id),
    });
  }

  handleLoadPokemons = (pokemons) => {
    this.setState({
      loadedPokemons: pokemons,
    });
  }

  render() {
    const { catchedPokemons, catchedIds } = this.state;
    const host = 'http://localhost:5005';
    const imgSrc = 'https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons';
    return (
      <Switch>
        <Route
          exact path="/"
          render={(props) => <PokemonsList
                                {...props}
                                catchedIds={catchedIds}
                                catchedPokemons={catchedPokemons}
                                onCatched={this.handleCatched}
                                onLoadPokemons={this.handleLoadPokemons}
                                host={host}
                                imgSrc={imgSrc}
                             />}
        />
        <Route
           exact path="/catched"
           render={(props) => <PokemonsCatched
                                {...props}
                                catchedPokemons={this.state.catchedPokemons}
                                imgSrc={imgSrc}
                              />}
         />
        <Route
          exact path="/pokemon/:id"
          render={(props) => <PokemonPage
                                {...props}
                                catchedIds={catchedIds}
                                catchedPokemons={catchedPokemons}
                                loadedPokemons={this.state.loadedPokemons}
                                host={host}
                                imgSrc={imgSrc}
                             />}
        />
      </Switch>
    );
  }
}
