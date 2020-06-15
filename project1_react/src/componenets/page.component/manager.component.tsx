import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./manager.component.css";
import { getAllTicket, getSort } from "../../remote/auth";
import { ManagerView } from "../../remote/models/manager_ticket";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

const useStyle = makeStyles({
  table: {
    minWidth: 650,
  },
});

const useStyl = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const ManagerComponent: React.FC = () => {
  const classes = useStyles();
  const class1 = useStyle();
  const class2 = useStyl();
  const history = useHistory();
  const [a, setA] = useState<ManagerView[]>();
  const [status, setStatus] = useState<any>();
  const [request, setRequest] = useState<number>();
  let i = 1;
  const handleClick = () => {
    history.push("/portal");
  };

  const handleChange = async (event: any) => {
    //console.log(event.target.value);
    setStatus(event.target.value);
    if (status) {
      const t = await getSort(status);
      setA(t.data);
    }
  };
  const handleRequest = (item: number) => {
    setRequest(item);
    console.log(request);
  };
  useEffect(() => {
    const renderTicket = async () => {
      const t = await getAllTicket();
      setA(t.data);
    };
    try {
      renderTicket();
    } catch (error) {}
  }, [status, request]);

  return i === 0 ? (
    <div>"I dont think so buster"</div>
  ) : (
    <React.Fragment>
      <div>
        <TableContainer component={Paper} id="table-display">
          <Table className={class1.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell id="table-text">ACTION</TableCell>
                <TableCell id="table-text">UUID</TableCell>
                <TableCell align="right" id="table-text">
                  First Name
                </TableCell>
                <TableCell align="right" id="table-text">
                  Last Name
                </TableCell>
                <TableCell align="right" id="table-text">
                  Amount
                </TableCell>
                <TableCell align="right" id="table-text">
                  Submit Date
                </TableCell>
                <TableCell align="right" id="table-text">
                  Resolve Date
                </TableCell>
                <TableCell align="right" id="table-text">
                  Resolver
                </TableCell>
                <TableCell align="right" id="table-text">
                  Description
                </TableCell>
                <TableCell align="right" id="table-text">
                  Reciept
                </TableCell>
                <TableCell align="right" id="table-text">
                  <FormControl
                    variant="outlined"
                    className={class2.formControl}
                    color="secondary"
                    id="o"
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={status}
                      onChange={handleChange}
                    >
                      <MenuItem id="o">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"PENDING"} id="o">
                        Pending
                      </MenuItem>
                      <MenuItem value={"APPROVED"} id="o">
                        Approved
                      </MenuItem>
                      <MenuItem value={"DENIED"} id="o">
                        Denied
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right" id="table-text">
                  Type
                </TableCell>
                <TableCell align="right" id="table-text">
                  R-ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {a?.map((item) => {
                return (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      id="t-text"
                      key={item.reimbId}
                    >
                      {item.status === "PENDING" ? (
                        <ButtonGroup
                          variant="contained"
                          color="secondary"
                          aria-label="contained primary button group"
                        >
                          <Button onClick={() => handleRequest(item.reimbId)}>
                            APPROVE
                          </Button>
                          <Button onClick={() => console.log(item.reimbId)}>
                            DENY
                          </Button>
                        </ButtonGroup>
                      ) : null}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.id}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.firstName}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.lastName}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.amount}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.submitDate}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.resolveDate}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.resolver}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.description}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.receipt}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.status}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.type}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.reimbId}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.root} id="button-back">
        <Button
          variant="contained"
          color="secondary"
          id="view-button"
          onClick={() => handleClick()}
        >
          Return To Portal
        </Button>
      </div>
    </React.Fragment>
  );
};
