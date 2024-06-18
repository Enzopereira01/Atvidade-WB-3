import React, { useEffect, useRef, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import styles from '../styles/myStyles.module.css';

type Props = {
    tema: string;
};

type Produto = {
    id: number;
    nome: string;
    preco: number;
    quantidadeEstoque: number;
    quantidadeVendida?: number;
    genero?: string;
};

const ListarProdutos: React.FC<Props> = ({ tema }) => {
    const modalProdutoRef = useRef<HTMLDivElement>(null);
    const modalGeneroRef = useRef<HTMLDivElement>(null);

    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [produtoGeneroSelecionado, setProdutoGeneroSelecionado] = useState<Produto | null>(null);

    useEffect(() => {
        M.AutoInit();
    }, []);

    useEffect(() => {
        if (modalProdutoRef.current) {
            M.Modal.init(modalProdutoRef.current);
        }
        if (modalGeneroRef.current) {
            M.Modal.init(modalGeneroRef.current);
        }
    }, []);

    const handleItemClick = (produto: Produto) => {
        setProdutoSelecionado(produto);
        const instance = M.Modal.getInstance(modalProdutoRef.current!);
        instance.open();
    };

    const handleGeneroItemClick = (produto: Produto) => {
        setProdutoGeneroSelecionado(produto);
        const instance = M.Modal.getInstance(modalGeneroRef.current!);
        instance.open();
    };

    const handleCloseModal = () => {
        setProdutoSelecionado(null);
        setProdutoGeneroSelecionado(null);
    };

    // Essas funções agora funcionarão diretamente com os estados locais
    const handleEdit = (produtoId: number) => {
        console.log(`Edit product with ID: ${produtoId}`);
    };

    const handleDelete = (produtoId: number) => {
        console.log(`Delete product with ID: ${produtoId}`);
    };

    const produtos: Produto[] = [
        {
            id: 1,
            nome: "Camiseta de algodão orgânico",
            preco: 20.00,
            quantidadeEstoque: 264,
            quantidadeVendida: 640,
            genero: "Unissex"
        },
        {
            id: 2,
            nome: "Shorts de treino feminino",
            preco: 25.00,
            quantidadeEstoque: 396,
            quantidadeVendida: 839,
            genero: "Feminino"
        },
        {
            id: 3,
            nome: "Jaqueta corta-vento",
            preco: 30.00,
            quantidadeEstoque: 199,
            quantidadeVendida: 602,
            genero: "Masculino"
        },
        {
            id: 4,
            nome: "Tênis de corrida leve",
            preco: 10.00,
            quantidadeEstoque: 356,
            quantidadeVendida: 484,
            genero: "Unissex"
        }
    ];

    const produtoMaisConsumido = [...produtos].sort((a, b) => (b.quantidadeVendida || 0) - (a.quantidadeVendida || 0))[0];
    const produtoMaisConsumidoPorGenero = (genero: string) => 
        [...produtos].filter(p => p.genero === genero).sort((a, b) => (b.quantidadeVendida || 0) - (a.quantidadeVendida || 0))[0];

    return (
        <div className="container">
            <h5>Produtos</h5>
            <div className="collection">
                {produtos.map((produto, index) => (
                    <div key={produto.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a
                            onClick={() => handleItemClick(produto)}
                            style={{ flex: 1, cursor: 'pointer' }}
                        >
                            {produto.nome}
                        </a>
                        <div>
                            <button onClick={() => handleEdit(produto.id)} className="btn btn-small blue">Editar</button>
                            <button onClick={() => handleDelete(produto.id)} className="btn btn-small red">Deletar</button>
                        </div>
                    </div>
                ))}
            </div>
            
            <h5>Produto Geral Mais Consumido</h5>
            <div className="collection">
                {produtoMaisConsumido && (
                    <div className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a
                            onClick={() => handleGeneroItemClick(produtoMaisConsumido)}
                            style={{ flex: 1, cursor: 'pointer' }}
                        >
                            {produtoMaisConsumido.nome}
                        </a>
                        <ul className="dropdown-content">
                            <li><span>Quantidade Vendida: {produtoMaisConsumido.quantidadeVendida}</span></li>
                            <li><span>Preço: {produtoMaisConsumido.preco?.toFixed(2)}</span></li>
                        </ul>
                    </div>
                )}
            </div>

            <h5>Produto Mais Consumido por Gênero</h5>
            <div className="collection">
                {["Masculino", "Feminino", "Unissex"].map(genero => {
                    const produto = produtoMaisConsumidoPorGenero(genero);
                    return produto && (
                        <div key={produto.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => handleGeneroItemClick(produto)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {produto.nome} ({genero})
                            </a>
                            <ul className="dropdown-content">
                                <li><span>Quantidade Vendida: {produto.quantidadeVendida}</span></li>
                                <li><span>Preço: {produto.preco?.toFixed(2)}</span></li>
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* Modal para todas as informações do produto */}
            <div id="modalProduto" className="modal" ref={modalProdutoRef}>
                <div className="modal-content">
                    {produtoSelecionado && (
                        <>
                            <h4>{produtoSelecionado.nome}</h4>
                            <p><strong>Preço:</strong> {produtoSelecionado.preco}</p>
                            <p><strong>Quantidade em Estoque:</strong> {produtoSelecionado.quantidadeEstoque}</p>
                            <p><strong>Quantidade Vendida:</strong> {produtoSelecionado.quantidadeVendida}</p>
                            <p><strong>Gênero:</strong> {produtoSelecionado.genero}</p>
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    <button onClick={handleCloseModal} className="modal-close btn-flat">Fechar</button>
                </div>
            </div>

            {/* Modal para informações de consumo do produto */}
            <div id="modalGenero" className="modal" ref={modalGeneroRef}>
                <div className="modal-content">
                    {produtoGeneroSelecionado && (
                        <>
                            <h4>{produtoGeneroSelecionado.nome}</h4>
                            <p><strong>Quantidade Vendida:</strong> {produtoGeneroSelecionado.quantidadeVendida}</p>
                            <p><strong>Preço:</strong> {produtoGeneroSelecionado.preco}</p>
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    <button onClick={handleCloseModal} className="modal-close btn-flat">Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ListarProdutos;
