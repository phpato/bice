import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Last extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last: []
        };
    }

    async getLast() {
        const lastResponse = await axios.get('https://bice-lab.herokuapp.com/bice_lab/last');
        const {data} = await lastResponse;
        this.setState({last: data.last.data});
    }

    componentDidMount() {
        this.getLast();
    }

    render() {
        const last = Object.values(this.state.last);
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

                {
                    last.length==0?
                        "Cargando..."
                    :
                    last.map( e => {
                        return (
                            <div className = "col-3">
                                <br></br>
                                <div className="card bg-primary text-white">
                                    <div className="card-header">
                                        <h4 className="card-title">{e.key}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{e.name}</p>
                                        <p className="card-text">{`${e.value} ${e.unit}`}</p>
                                    </div>
                                </div>
                            </div>
                            )  
                })}
                </div>
            
            </div>
        );
    }
}

export default Last;
