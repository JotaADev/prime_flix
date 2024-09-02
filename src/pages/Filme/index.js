import { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./style.css";

const Filme = () => {

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        async function carregarDetalhes() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: 'e717076e8cc8ebf82e8ddeaca621293b',
                    language: 'pt-br'
                }}
            )
            .then((response) => {
                setFilme(response.data)
                setLoading(false);
            })
            .catch(() => {
                navigate("/", {replace: true});
                return;
            })
        }

        carregarDetalhes();

        return () =>{}
    }, []);

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

        if (hasFilme) {
            toast.warn("Esse filme já esta na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    }

    if(loading) {
        return(
            <div className="filme-info">
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button onClick={() => {window.open(`https://youtube.com/results?search_query=Trailer ${filme.title}`)}}>
                    Trailer
                </button>
            </div>
        </div>
    );
}

export default Filme;