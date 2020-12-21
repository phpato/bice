import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class DateKey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateKey: [],
            date: "",
            errors:[],
            key: ""
            
        };
    }

    setDate(date) {
        this.setState({date})
    }

    setKey(key) {
        this.setState({key})
    }

    searchDateKey = event => {
        event.preventDefault();
        const date = this.state.date;
        const key = this.state.key;
        if (this.state.date=="") {
            this.setState({errors: ["sdebe ingresar una fecha."]});
            return;
        }
        if (this.state.key=="") {
            this.setState({errors: ["sdebe ingresar un indicador."]});
            return;
        }
        this.setState({errors: []});
        axios
            .get(`https://bice-lab.herokuapp.com/bice_lab/date/${key}/${date}`)
            .then(res => {
                this.setState({dateKey: res.data})
            })
    }

    render() {
        const options = [
            "cobre",
            "dolar",
            "euro",
            "ipc",
            "ivp",
            "oro",
            "plata",
            "uf",
            "utm",
            "yen"
        ];
        const infoDateKey = this.state.dateKey;

        return (
            <div className="container">
                <div className="row" >
                    <div className={this.state.errors.length>0 ?"col-12 bg-danger" : ""}>
                        <ul>
                            {this.state.errors.length > 0 ? 
                                this.state.errors.map(error => {
                                    return<li>{error}</li>
                                })
                            :
                            ""
                            }
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <br/>
                        <div className = "form-group">
                            <Link to="/" className="btn btn-success">
                                <i className="fa fa-arrow-left"></i> Volver
                            </Link>
                        </div>
                    </div>
                    <div className="col-12">
                        <br/>
                        <div className="card">
                            <div className="card-body">

                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Selecione un indicadr:</label>
                                        <select className="form-control" onChange={e => this.setKey(e.target.value)}>
                                            <option value="">Seleccione una opción</option>
                                            {
                                                options.map(e => {
                                                    return <option key={e} value={e}>{e}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Selecione una fecha:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            onChange={e => this.setDate(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-success" onClick={e => this.searchDateKey(e)}>
                                            <i className="fa fa-search"></i > Buscar
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={infoDateKey.keyDate? "card bg-primary": ""}>
                                        {infoDateKey.keyDate?
                                        <div className="card">
                                            <div className="card-header">
                                                <label>{infoDateKey.keyDate.key}</label>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">Fecha: {this.state.date}</p>
                                                <p className="card-text">Descripción: {infoDateKey.keyDate.name}</p>
                                                <p className="card-text">Unidad: {infoDateKey.keyDate.unit}</p>
                                                <p className="card-text">Valor: {infoDateKey.keyDate.value? infoDateKey.keyDate.value: "Sin valor"}</p>
                                            </div>
                                            
                                        </div>

                                            
                                        :
                                            ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DateKey;
