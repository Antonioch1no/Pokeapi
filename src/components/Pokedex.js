import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import { useNavigate } from "react-router-dom";

const Pokedex = () => {
	const [types, setTypes] = useState();
	const [characters, setCharacters] = useState([]);
	const [searchName, setSearchName] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154")
			.then((res) => setCharacters(res.data.results));

		axios
			.get("https://pokeapi.co/api/v2/type/")
			.then((res) => setTypes(res.data.results));
	}, []);
	const userName = useSelector((state) => state.name);
	/////////////
	const [page, setPage] = useState(1);
	const pokemonsPerPage = 6;
	const lastIndex = page * pokemonsPerPage; // 5
	const firstIndex = lastIndex - pokemonsPerPage; // 0
	const pokemonPaginated = characters?.slice(firstIndex, lastIndex);
	const totalPages = Math.ceil(characters?.length / pokemonsPerPage);

	const numbers = [];
	for (let i = 1; i <= totalPages; i++) {
		numbers.push(i);
	}

	/////////////

	const searchPokemon = () => {
		navigate(`/pokedex/${searchName.toLowerCase()}`);
	};

	const filterType = (e) => {
		axios.get(e.target.value).then((res) => setCharacters(res.data.pokemon));
	};
	console.log(characters);
	return (
		<div className="pokedex">
			<h1> Welcome trainer : {userName}</h1>
			<input
				type="text"
				placeholder="search pokemon"
				value={searchName}
				onChange={(e) => setSearchName(e.target.value)}
			/>
			<button onClick={searchPokemon}>search</button>
			<select name="" id="" onChange={filterType}>
				{types?.map((type) => (
					<option value={type.url} key={type.url}>
						{type.name}
					</option>
				))}
			</select>
			<div className="container">
				<ul style={{ listStyle: "none" }} className="containerP">
					{pokemonPaginated.map((pokemon) => (
						<li key={pokemon.url ? pokemon.url : pokemon.pokemon.url}>
							{
								<PokemonCard
									url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
								/>
							}
						</li>
					))}
				</ul>
			</div>

			<button onClick={() => navigate(-1)}>Ir atrás</button>

			<div>
				<button onClick={() => setPage(page - 1)} disabled={page === 1}>
					Prev Page
				</button>
				{numbers.map((number) => (
					<button onClick={() => setPage(number)}>{number}</button>
				))}
				<button
					onClick={() => setPage(page + 1)}
					disabled={page === totalPages}
				>
					Next Page
				</button>
			</div>
		</div>
	);
};
export default Pokedex;
