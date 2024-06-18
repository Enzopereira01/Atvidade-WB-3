import React, { Component } from "react";

type Props = {
    tema: string;
};

type State = {
    editing: boolean;
};

export default class CadastrarServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    handleEdit = () => {
        console.log("Editar serviço");
        // Aqui você pode implementar a lógica para editar o serviço
    };

    handleDelete = () => {
        console.log("Deletar serviço");
        // Aqui você pode implementar a lógica para deletar o serviço
    };

    render() {
        const { tema } = this.props;
        const { editing } = this.state;
        let estiloBotao = `btn waves-effect waves-light ${tema}`;

        return (
            <div className="container">
                <div className="row">
                    <h5><strong>Cadastro Serviços</strong></h5>
                    <form className="col s12">
                        <div id="modalLine" className="row">
                            <div className="input-field col s7">
                                <input id="name" type="text" className="validate" style={{ border: "1px solid #9e9e9e", borderRadius: "10px", padding: " 7px" }} />
                                <label htmlFor="name">Nome</label>
                            </div>
                            <div className="input-field col s5">
                                <input id="price" type="text" className="validate" style={{ border: "1px solid #9e9e9e", borderRadius: "10px", padding: " 7px" }} />
                                <label htmlFor="price">Preço</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 right-align">
                                {editing ? (
                                    <>
                                        <button className={`btn waves-effect waves-light ${tema}`} onClick={this.handleEdit}>
                                            Editar
                                            <i className="material-icons right">edit</i>
                                        </button>
                                        <button className={`btn waves-effect waves-light red`} onClick={this.handleDelete}>
                                            Deletar
                                            <i className="material-icons right">delete</i>
                                        </button>
                                    </>
                                ) : (
                                    <button className={estiloBotao} type="submit" name="action">
                                        Submit
                                        <i className="material-icons right">send</i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
