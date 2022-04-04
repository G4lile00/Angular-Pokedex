import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-specify',
  templateUrl: './specify.component.html',
  styleUrls: ['./specify.component.css']
})
export class SpecifyComponent implements OnInit {

  constructor() { }
  public poke: any;

  ngOnInit(): void {
 this.getPokemon().then((res) =>
       this.poke= res);

  }

  getPokemon() {
    var url = document.URL;
    var id = url.substring(url.lastIndexOf('=') + 1);
    var pokemon_url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemon = fetch(pokemon_url).then((res) => res.json());

    const poke = pokemon.then((data) => {
      const pokes =  {
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        types: data.types.map((type: any) => type.type.name),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((ability: any) => ability.ability.name),
        moves: data.moves.map((move: any) => move.move.name),
      }
      return pokes

    });
    return poke;
  }
 
  


}
