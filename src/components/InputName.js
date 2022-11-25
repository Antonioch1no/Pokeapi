import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slices/name.slice";

const InputName = () => {
	const [userName, setUserName] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const enterName = () => {
		dispatch(changeName(userName));
		navigate("/pokedex");
	};
	return (
		<>
			<div className="input">
				<img
					className="logo"
					src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
					alt=""
				/>

				<h1> ¡Hola entrenador! </h1>
				<p>Para poder comenzar, dame tu nombre</p>
				<input
					type="text"
					onChange={(e) => setUserName(e.target.value)}
					value={userName}
				/>
				<button onClick={enterName}>Enter</button>
			</div>
			<img
				className="ash"
				src="https://i.pinimg.com/564x/f8/29/be/f829bed61f75627eea111dfde089fe2c.jpg"
				alt=""
			/>
		</>
	);
};
export default InputName;
