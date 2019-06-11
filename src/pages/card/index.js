import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardHeader, List, Card, ListItem } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Lista from "../NomeLista";
import DialogComp from "../card/dialog";

const useStyles = {
  root: {
    width: "100%",
  },
};

class Agenda extends Component {
  state = {
    open: false,
    backgroundColor: "",
  };

  converte = letras => {
    const code = Buffer.from(letras, "utf8");
    const color = code[0] + code[1] + code[2];
    return color;
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <List style={useStyles.root}>
        {this.props.agendaDatas.map(x => (
          <ListItem>
            <Card id={x.id} style={{ width: "100%" }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" style={{ backgroundColor: "#" + this.converte(x.evento) }}>
                    {x.evento[0].toUpperCase()}
                  </Avatar>
                }
                action={
                  <div style={{ display: "flex" }}>
                    <Lista pedidosPorId={this.props.agendaDatas.filter(y => y._id === x._id)} />
                    <DialogComp pedidosPorId={this.props.agendaDatas.filter(y => y._id === x._id)} />
                  </div>
                }
                title={`${x.evento} ${x.data} `}
                subheader={x.local + " a partir das " + x.horario}
              />
            </Card>
          </ListItem>
        ))}
      </List>
    );
  }
}

Agenda.propTypes = {
  agendaDatas: PropTypes.array,
};

export default Agenda;
