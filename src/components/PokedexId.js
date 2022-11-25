import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PokedexId = () => {
	const [pokemon, setPokemon] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
			.then((res) => setPokemon(res.data));
	}, []);
	console.log(pokemon);
	return (
		<div>
			<div className="cardId">
				<h2>Name: {pokemon.name}</h2>
				<br />
				<img
					className="idImage"
					src={pokemon.sprites?.other.dream_world.front_default}
					alt=""
				/>
				<div className="stats">
					<h3>
						{pokemon.stats?.map((stat) => (
							<p>
								{" "}
								{stat.base_stat}
								<br />
								{stat.stat.name}
							</p>
						))}
						;
					</h3>
				</div>
				<br />
			</div>

			<button onClick={() => navigate(-1)}>Ir atrás</button>
		</div>
	);
};
export default PokedexId;
