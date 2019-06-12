import React, { Component } from "react";
import PropTypes from "prop-types";
import api from "../../service/api";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Snackbar,
  Tooltip,
} from "@material-ui/core";

import ButtonMT from "@material-ui/core/Button";
import { Add } from "@material-ui/icons";

class dialog extends Component {
  state = {
    open: false,
    pedidoPor: "",
    nomeMusica: "",
    listMusicas: this.props.pedidosPorId[0].pedidos,
    openSnackbar: false,
    mensagem: "",
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.handleCloseSnackbar();
  };

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
  };

  handleOpenSnackbar = mensagem => {
    this.setState({ mensagem: mensagem });
    this.setState({ openSnackbar: true });
  };

  onChangePedidoPor = el => {
    this.setState({ pedidoPor: el.target.value });
  };

  onChangeMusica = el => {
    this.setState({ nomeMusica: el.target.value });
  };

  getListMusicas = async () => {
    const list = await api.get(`/dataEvento/${this.props.pedidosPorId[0]._id}`);
    const pedidos = list.data.pedidos;
    this.setState({ listMusicas: pedidos.length > 0 ? pedidos : [] });
  };

  addMusica = async () => {
    if (this.state.nomeMusica === "" || this.state.pedidoPor === "") {
      const mensagem = `Os campos "Nome" e "Música" devem ser preenchidos!`;
      this.handleOpenSnackbar(mensagem);
    }

    const newPedidoDeMusica = {
      nomeMusica: this.state.nomeMusica,
      pedidoPor: this.state.pedidoPor,
    };

    await api.post(`/dataEvento/${this.props.pedidosPorId[0]._id}/pedidos`, newPedidoDeMusica);
    api.get(`/dataEvento/${this.props.pedidosPorId[0]._id}/emailSendPedidos`);

    document.getElementById("musica").value = null;
    this.handleOpenSnackbar("Pedido inserido com sucesso");
  };

  render() {
    return (
      <div>
        <Tooltip title="Pedir música">
          <IconButton onClick={this.handleClickOpen}>
            <Add />
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <Typography variant="h5" color="textSecondary" component="p">
              <div>
                {`Pedir música para o evento ${this.props.pedidosPorId[0].evento} ${this.props.pedidosPorId[0].data}`}
              </div>
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Snackbar
              anchorOrigin={{ horizontal: "center", vertical: "center" }}
              open={this.state.openSnackbar}
              autoHideDuration={4000}
              ContentProps={{
                "aria-describedby": "message-id",
              }}
              action={[
                <ButtonMT color="secondary" onClick={this.handleCloseSnackbar}>
                  OK
                </ButtonMT>,
              ]}
              message={<span id="message-id">{this.state.mensagem}</span>}
            />
            <TextField
              autoFocus
              margin="dense"
              id="musica"
              label="Qual sua música?"
              fullWidth
              onChange={this.onChangeMusica}
            />
            <TextField margin="dense" id="nome" label="Digite seu nome " fullWidth onChange={this.onChangePedidoPor} />
          </DialogContent>
          <DialogActions>
            <div id="camposForm">
              <ButtonMT color="secondary" onClick={this.handleClose}>
                Cancelar
              </ButtonMT>
              <ButtonMT color="primary" onClick={this.addMusica}>
                Pedir
              </ButtonMT>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
dialog.propTypes = {
  pedidosPorId: PropTypes.array,
};
export default dialog;
