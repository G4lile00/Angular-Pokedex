import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
  
export class CardsComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
    const GetPokemons = () => {
      const promises = [];
    
      for (let i = 1; i < 899; i++) {
        
          promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json()));

      
      }
      Promise.all(promises).then((data) => {
        const pokemon = data.map((poke) => ({
          name: poke.name,
          id: poke.id,
          image: poke.sprites["front_default"],
          type: poke.types[0].type.name,
          types: poke.types.map((type:any) => type.type.name),
        }));
        Makelist(pokemon);
        MakeDataList(pokemon);
      });
    };
    
    function Makelist(object: any[]) {
      let pokedex = document.getElementById("pokedex");
      const Lists = object
        .map(
          (individual: { type: any; image: any; id: any; name: any; types: any; }) => `<li onclick="function popUp(){
            window.open('/poke?id=${individual.id}', '_self');}
            popUp()">
        <div class="Card ${individual.type}">
        <img class="Card-img" src="${individual.image}" alt="${individual.id}">
        <div class="Card-info ">
     
        <h3 class = "PokeName" id="${individual.name}">${individual.name}</h3>
        <p class = "PokeType">${individual.types}</p>
        </div>
        <div class="Card-id">
        <h2>${individual.id}</h2>
        </div>
        </div>
        </li>`,
        )
        .join("");
      pokedex!.innerHTML = Lists + pokedex!.innerHTML;

    }

    function MakeDataList(object: any[]) {
      let datalist = document.getElementById("pokemon");
      const datas = object
        .map(
          (individual: {name: any}) => ` <option value="${individual.name}"></option>`,
        )
        .join("");
      datalist!.innerHTML = datas + datalist!.innerHTML;
    }
    
    GetPokemons();
    
    const button = document.getElementById("searchButton");
    
    button!.addEventListener("click", (e) => {
      e.preventDefault();

      const inputName = (<HTMLInputElement>document.getElementById("searchInputName")!).value;
      const name = document.querySelector<HTMLElement>(`[id="${inputName}"]`);
    
     
      if (name) {
        const Card = name!.parentElement!.parentElement;
        window.scrollTo(0, name.offsetTop - 500);
        Card!.classList.add("bouncer");
        setTimeout(() => {
          Card!.classList.remove("bouncer");
        }, 2000);
      }
    
    });


    

  }

}

