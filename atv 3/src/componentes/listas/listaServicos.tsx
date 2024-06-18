import React, { useEffect, useRef, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import styles from '../styles/myStyles.module.css';

type Props = {
    tema: string;
};

type Servico = {
    id: number;
    nome: string;
    preco: number;
    duracaoMinutos: number;
    quantidadeAgendamentos?: number;
    genero?: string;
};

const ListarServicos: React.FC<Props> = ({ tema }) => {
    const modalServicoRef = useRef<HTMLDivElement>(null);
    const modalGeneroRef = useRef<HTMLDivElement>(null);

    const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);
    const [servicoGeneroSelecionado, setServicoGeneroSelecionado] = useState<Servico | null>(null);

    useEffect(() => {
        M.AutoInit();
    }, []);

    useEffect(() => {
        if (modalServicoRef.current) {
            M.Modal.init(modalServicoRef.current);
        }
        if (modalGeneroRef.current) {
            M.Modal.init(modalGeneroRef.current);
        }
    }, []);

    const handleItemClick = (servico: Servico) => {
        setServicoSelecionado(servico);
        const instance = M.Modal.getInstance(modalServicoRef.current!);
        instance.open();
    };

    const handleGeneroItemClick = (servico: Servico) => {
        setServicoGeneroSelecionado(servico);
        const instance = M.Modal.getInstance(modalGeneroRef.current!);
        instance.open();
    };

    const handleCloseModal = () => {
        setServicoSelecionado(null);
        setServicoGeneroSelecionado(null);
    };

    // Essas funções agora funcionarão diretamente com os estados locais
    const handleEdit = (servicoId: number) => {
        console.log(`Edit service with ID: ${servicoId}`);
    };

    const handleDelete = (servicoId: number) => {
        console.log(`Delete service with ID: ${servicoId}`);
    };

    const servicos: Servico[] = [
        {
            id: 1,
            nome: "Clube de corrida",
            preco: 48.00,
            duracaoMinutos: 60,
            quantidadeAgendamentos: 50,
            genero: "Unissex"
        },
        {
            id: 2,
            nome: "Musculação",
            preco: 60.00,
            duracaoMinutos: 30,
            quantidadeAgendamentos: 80,
            genero: "Masculino"
        },
        {
            id: 3,
            nome: "Aulas de yoga",
            preco: 79.00,
            duracaoMinutos: 45,
            quantidadeAgendamentos: 60,
            genero: "Feminino"
        },
        {
            id: 4,
            nome: "Assessoria esportiva personalizada",
            preco: 50.00,
            duracaoMinutos: 90,
            quantidadeAgendamentos: 30,
            genero: "Unissex"
        }
    ];

    const servicoMaisAgendado = [...servicos].sort((a, b) => (b.quantidadeAgendamentos || 0) - (a.quantidadeAgendamentos || 0))[0];
    const servicoMaisAgendadoPorGenero = (genero: string) => 
        [...servicos].filter(s => s.genero === genero).sort((a, b) => (b.quantidadeAgendamentos || 0) - (a.quantidadeAgendamentos || 0))[0];

    return (
        <div className="container">
            <h5>Serviços</h5>
            <div className="collection">
                {servicos.map(servico => (
                    <div key={servico.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a onClick={() => handleItemClick(servico)} style={{ flex: 1, cursor: 'pointer' }}>
                            {servico.nome}
                        </a>
                        <div>
                            <button onClick={() => handleEdit(servico.id)} className="btn btn-small blue">Editar</button>
                            <button onClick={() => handleDelete(servico.id)} className="btn btn-small red">Deletar</button>
                        </div>
                    </div>
                ))}
            </div>

            <h5>Serviço Mais Agendado Geral</h5>
            <div className="collection">
                {servicoMaisAgendado && (
                    <div className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a onClick={() => handleGeneroItemClick(servicoMaisAgendado)} style={{ flex: 1, cursor: 'pointer' }}>
                            {servicoMaisAgendado.nome}
                        </a>
                        <ul className="dropdown-content">
                            <li><span>Quantidade de Agendamentos: {servicoMaisAgendado.quantidadeAgendamentos}</span></li>
                            <li><span>Preço: {servicoMaisAgendado.preco?.toFixed(2)}</span></li>
                        </ul>
                    </div>
                )}
            </div>

            <h5>Serviço Mais Agendado por Gênero</h5>
            <div className="collection">
                {["Masculino", "Feminino", "Unissex"].map(genero => {
                    const servico = servicoMaisAgendadoPorGenero(genero);
                    return servico && (
                        <div key={servico.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a onClick={() => handleGeneroItemClick(servico)} style={{ flex: 1, cursor: 'pointer' }}>
                                {servico.nome} ({genero})
                            </a>
                            <ul className="dropdown-content">
                                <li><span>Quantidade de Agendamentos: {servico.quantidadeAgendamentos}</span></li>
                                <li><span>Preço: {servico.preco?.toFixed(2)}</span></li>
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* Modal para todas as informações do serviço */}
            <div id="modalServico" className="modal" ref={modalServicoRef}>
                <div className="modal-content">
                    {servicoSelecionado && (
                        <>
                            <h4>{servicoSelecionado.nome}</h4>
                            <p><strong>Preço:</strong> {servicoSelecionado.preco}</p>
                            <p><strong>Duração (minutos):</strong> {servicoSelecionado.duracaoMinutos}</p>
                            <p><strong>Quantidade de Agendamentos:</strong> {servicoSelecionado.quantidadeAgendamentos}</p>
                            <p><strong>Gênero:</strong> {servicoSelecionado.genero}</p>
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
                    {servicoGeneroSelecionado && (
                        <>
                            <h4>{servicoGeneroSelecionado.nome}</h4>
                            <p><strong>Quantidade Vendida:</strong> {servicoGeneroSelecionado.quantidadeAgendamentos}</p>
                            <p><strong>Preço:</strong> {servicoGeneroSelecionado.preco}</p>
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

export default ListarServicos;
