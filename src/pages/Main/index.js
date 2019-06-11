import React, { Component } from "react";
import Agenda from "../card";
import "./main.css";
import logo from "../../img/corte2.png";
import api from "../../service/api";

class Main extends Component {
  state = {
    agendaDatas: [],
    pedidosPorId: [],
  };

  componentDidMount() {
    this.buscarAgenda();
  }

  buscarAgenda = async () => {
    const rest = await api.get("/dataEvento");
    if (rest.data.length > 0) {
      this.setState({ agendaDatas: rest.data });
      this.setState({ pedidosPorId: rest.data[0].pedidos });
    }
  };
  render() {
    return (
      <div style={{ position: "relative" }}>
        <header id="divDeCima">
          <div>
            <img id="idImagem" alt="" src={logo} />
            <h1>Agenda</h1>
          </div>
        </header>
        <div id="container">
          <div id="divDeBaixo">
            <Agenda agendaDatas={this.state.agendaDatas} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
