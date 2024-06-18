import React, { useEffect, useCallback } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import styles from '../styles/myStyles.module.css';

type Props = {
    tema: string,
    botoes: string[],
    seletorView: Function
}

const BarraNavegacao: React.FC<Props> = ({ tema, botoes, seletorView }) => {
    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function () {
            let elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems);
        });
    }, []);

    const gerarListaBotoes = useCallback(() => {
        if (botoes.length <= 0) {
            return <></>;
        } else {
            let lista = botoes.map(valor =>
                <li key={valor}><a onClick={(e) => seletorView(valor, e)}>{valor}</a></li>
            );
            return lista;
        }
    }, [botoes, seletorView]);

    let estilo = `${tema}`;

    return (
        <>
            <nav className={estilo}>
                <div className="nav-wrapper">
                    <a className={`brand-logo ${styles.logo}`}>WB</a>
                    <a data-target="mobile-menu" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        {gerarListaBotoes()}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-menu">
                {gerarListaBotoes()}
            </ul>
        </>
    );
};

export default BarraNavegacao;
