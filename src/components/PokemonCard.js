import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const PokemonCard = ({ url }) => {
	const [character, setCharacter] = useState({});
	useEffect(() => {
		axios.get(url).then((res) => setCharacter(res.data));
	}, []);

	return (
		<div className="cardW">
			<Link to={`/pokedex/${character.id}`}>
				{["Success"].map((variant) => (
					<Card
						bg={variant.toLowerCase()}
						key={variant}
						text={variant.toLowerCase() === "light" ? "dark" : "white"}
						style={{ width: "18rem" }}
						className="mb-2"
					>
						<Card.Header>Header</Card.Header>
						<Card.Body>
							<Card.Title>
								{" "}
								<h4>{character.name}</h4>
							</Card.Title>
							<Card.Text>
								<img
									className="pokeImage"
									src={character.sprites?.other.dream_world.front_default}
									alt=""
								/>
							</Card.Text>
						</Card.Body>
					</Card>
				))}
			</Link>
		</div>
	);
};
export default PokemonCard;
