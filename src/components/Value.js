import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';

class Value extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueKey: "",
            info: [],
            loading: false
        };
    }

    async getValueKey(key) {
        this.setState({loading: true});
        this.setState({valueKey: key});
        const valueResponse = await axios.get(
            `https://bice-lab.herokuapp.com/bice_lab/value/${key}`
        );
        const {data} = await valueResponse;
        this.setState({loading: false});
        this.setState({info: data.value});
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
        const info = this.state.info;
        const datesWithValues = info.values;
        return (
            <div className="container">
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
                                <label>Seleccione un indicador:</label>
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        onChange={e => this.getValueKey(e.target.value)}>
                                        <option value="">Seleccione una opción</option>
                                        {
                                            options.map(e => {
                                                return <option value={e}>{e}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                {
                                    this.state.loading
                                        ? 
                                        "Cargando..."
                                        : ""
                                }
                            </div>
                        </div>

                        {
                            info.length != 0 && !this.state.loading
                                ? <div className="card bg-primary text-white">
                                        <div className="card-body">
                                            <h1>{info.key}:</h1>
                                            <div className="form-group">
                                                <p className="card-text">{info.name}</p>
                                                <p className="card-text">Unidad: {info.unit}</p>
                                                <p className="card-text">Valores:
                                                </p>
                                                <div className="row">
                                                    {
                                                        datesWithValues.map((e, i) => {
                                                            return (
                                                                <div className="col-3">
                                                                    <br/>
                                                                    <div className="card bg-danger text-white">
                                                                        <div className="form-group" key={i}>
                                                                            <p>Fecha: {moment(e.date).format("YYYY-MM-DD HH:MM:SS")}</p>
                                                                            <p>Valor: {e.value}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Value;
