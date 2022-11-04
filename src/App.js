import "./App.css";
import { Music } from "./component/music";

function App() {
	return (
		<div className="App">
			<main>
				<Music />
			</main>

			<footer>
				<p>Desenvolvido por Davi Samuel</p>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://github.com/Davisamasoa"
				>
					<i class="bi bi-github"></i>
				</a>
			</footer>
		</div>
	);
}

export default App;
