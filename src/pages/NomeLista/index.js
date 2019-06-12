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
import { PlaylistAdd } from "@material-ui/icons";

class Lista extends Component {
  state = {
    open: false,
    nome: "",
    phone: "",
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

  onChangeNome = el => {
    this.setState({ nome: el.target.value });
  };

  onChangePhone = el => {
    this.setState({ phone: el.target.value });
  };

  addNomeLista = async () => {
    if (this.state.nome === "" || this.state.phone === "") {
      const mensagem = `Os campos "Nome" e "Telefone" devem ser preenchidos!`;
      this.handleOpenSnackbar(mensagem);
    }

    const newNomeLista = {
      nome: this.state.nome,
      phone: this.state.phone,
    };

    await api.post(`/dataEvento/${this.props.pedidosPorId[0]._id}/nomeLista`, newNomeLista);
    api.get(`/dataEvento/${this.props.pedidosPorId[0]._id}/emailSendNomeLista`);

    this.handleOpenSnackbar("Seu nome foi inserido com sucesso");

    document.getElementById("nome").value = null;
    document.getElementById("phone").value = null;
  };

  render() {
    return (
      <div>
        <Tooltip title="Nome na lista">
          <IconButton onClick={this.handleClickOpen}>
            <PlaylistAdd />
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <Typography variant="h5" color="textSecondary" component="p">
              <div>
                {`Enviar nome para a lista do evento ${this.props.pedidosPorId[0].evento} ${this.props.pedidosPorId[0].data}`}
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
              id="nome"
              label="Insira seu nome completo"
              fullWidth
              onChange={this.onChangeNome}
            />
            <TextField
              margin="dense"
              id="phone"
              label="Insira seu número de telefone para contato"
              fullWidth
              onChange={this.onChangePhone}
            />
          </DialogContent>
          <DialogActions>
            <div id="camposForm">
              <ButtonMT color="secondary" onClick={this.handleClose}>
                Cancelar
              </ButtonMT>
              <ButtonMT color="primary" onClick={this.addNomeLista}>
                Enviar
              </ButtonMT>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
Lista.propTypes = {
  pedidosPorId: PropTypes.array,
};
export default Lista;
