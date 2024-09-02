import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

const Home = () => {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarFilmes() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: 'e717076e8cc8ebf82e8ddeaca621293b',
                    language: 'pt-br',
                    page: '1'
                }}
            )

            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
        }

        carregarFilmes();
    }, []);

    if(loading) {
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => (
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Home;