import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: []
        };
    }

    async getServices(){
      const servicesResponse = await axios.get('https://bice-lab.herokuapp.com/bice_lab/services');
      const { data } = await servicesResponse;
      this.setState({services: data.services});
    }

    componentDidMount() {
      this.getServices();
    }

    checkComponent(uri){
      switch (uri) {
        case '/last':
          return "/last";
        case '/values/:key':
          return "/value";
        case '/date/:key/:date':
          return "/date";
        default:
      }
    }

    render() {
        const {services} = this.state;
        return (
            <div className="container" >
                <div className="row">
                    {
                        services.length == 0
                            ? "Sin servicios"
                            : services.map(e => {
                                return (
                                    <div className="col-3" key={e.url_params}>
                                      <br />
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">{e.url_params}</h4>
                                                <p className="card-text">{e.descriptor}</p>
                                                <Link className="btn btn-info" to={this.checkComponent(e.url_params)}>
                                                  <i className="fa fa-eye"></i> Ver
                                                </Link>
                                            </div>
                                            <img
                                                className="img-fluid"
                                                src="https://www.chatfinanciero.cl/wp-content/uploads/2013/08/billete-dolar.png"
                                                alt="Card image"/>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        );
    }
}

export default Main;
