import { Component, useCallback, useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import CadastrarCliente from "../cadastros/CadastrarCliente";
import CadastrarProduto from "../cadastros/CadastrarProduto";
import CadastrarServico from "../cadastros/CadastrarServico";
import ListarClientes from "../listas/listarCliente";
import ListarProdutos from "../listas/listarProdutos";
import ListarServicos from "../listas/listarServicos";

type State = {
    tela: string;
};

const Roteador = () => {
    const [state, setState] = useState<State>({
        tela: 'Listar Serviços'
    });

    const selecionarView = useCallback((novaTela: string, evento: Event) => {
        evento.preventDefault();
        console.log(novaTela);
        setState({ tela: novaTela });
    }, []);

    let barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="black" botoes={['Cadastrar Cliente','Cadastrar Produto', 'Cadastrar Serviço', 'Listar Clientes', 'listar Produtos', 'Listar Serviços']} />;

    if (state.tela === 'Cadastrar Cliente') {
        return (
            <>
                {barraNavegacao}
                <CadastrarCliente tema="black" />
            </>
        );
    } else if (state.tela === 'Cadastrar Produto') {
        return (
            <>
                {barraNavegacao}
                <CadastrarProduto tema="black" />
            </>
        );
    } else if (state.tela === 'Cadastrar Serviço') {
        return (
            <>
                {barraNavegacao}
                <CadastrarServico tema="black" />
            </>
        );
    } else if (state.tela === 'Listar Clientes') {
        return (
            <>
                {barraNavegacao}
                <ListarClientes tema="black" />
            </>
        );
    } else if (state.tela === 'listar Produtos') {
        return (
            <>
                {barraNavegacao}
                <ListarProdutos tema="black" />
            </>
        );
    } else if (state.tela === 'Listar Serviços') {
        return (
            <>
                {barraNavegacao}
                <ListarServicos tema="black" />
            </>
        );
    }

    return null;
};

export default Roteador;
