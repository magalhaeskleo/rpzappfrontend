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
} from "@material-ui/core";

import ButtonMT from "@material-ui/core/Button";
import { PlaylistAdd } from "@material-ui/icons";

class dialog extends Component {
  state = {
    open: false,
    pedidoPor: "",
    nomeMusica: "",
    listMusicas: this.props.pedidosPorId[0].pedidos,
    openSnackbar: false,
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

  handleOpenSnackbar = () => {
    this.setState({ openSnackbar: true });
  };

  onChangeNome = el => {
    this.setState({ nomeMusica: el.target.value });
  };

  onChangeMusica = el => {
    this.setState({ pedidoPor: el.target.value });
  };

  onChangeListMusicas = async () => {
    debugger;
    const list = await api.get(`/dataEvento/${this.props.pedidosPorId[0]._id}`);
    const pedidos = list.data.pedidos;
    this.setState({ listMusicas: pedidos.length > 0 ? pedidos : [] });
  };

  addMusica = async () => {
    const newPedidoDeMusica = {
      nomeMusica: this.state.nomeMusica,
      pedidoPor: this.state.pedidoPor,
    };
    debugger;
    await api.post(`/dataEvento/${this.props.pedidosPorId[0]._id}/pedidos`, newPedidoDeMusica);

    this.setState({ pedidoPor: "" });
    document.getElementById("musica").value = null;

    await this.onChangeListMusicas();
  };

  render() {
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <PlaylistAdd />
        </IconButton>

        <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <Typography variant="h5" color="textSecondary" component="p">
              <div>{this.props.pedidosPorId[0].evento + " " + this.props.pedidosPorId[0].data}</div>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <div id="listaPedidos">
              {this.state.listMusicas.map(x => (
                <Typography variant="alignLeft" color="textSecondary" component="p">
                  {'"' + x.pedidoPor.toUpperCase() + '"' + " pedido por " + '"' + x.nomeMusica + '"'}
                </Typography>
              ))}
            </div>
          </DialogContent>

          <DialogActions>
            <div id="camposForm">
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
                message={<span id="message-id">Os campos "Nome" e "Música" devem ser preenchidos!</span>}
              />
              <TextField
                autoFocus
                margin="dense"
                id="musica"
                label="Qual sua música?"
                fullWidth
                onChange={this.onChangeMusica}
              />
              <TextField margin="dense" id="nome" label="Digite seu nome " fullWidth onChange={this.onChangeNome} />
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
