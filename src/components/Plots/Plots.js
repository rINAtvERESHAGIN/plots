import React, {useState} from "react";
import Plot from 'react-plotly.js';
import {Button} from "@material-ui/core";
import Laba3ImEx from "./Laba3ImEx";
import Laba2 from "./Laba2";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from '@material-ui/core/styles';
import Laba4 from "./Laba4";
import Laba5 from "./Laba5";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Plots = props => {
  const classes = useStyles();
  const [start, setStart] = useState(false);

  const [callLaba, setCallLaba] = useState('')

  const handleSetLaba = (e, name) => {
    setCallLaba(name);
    handleSetLoadgin(true);
  };

  const handleSetLoadgin = (value) => {
    setStart(value);
  }

  return (
    <React.Fragment>
      <Backdrop open={start} className={classes.backdrop}>
        <CircularProgress color="inherit"/>
      </Backdrop>

      <div
        style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "100%", height: "100%"}}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
          <Button variant={"outlined"} style={{flexGrow: 1}} onClick={(e) => handleSetLaba(e, 'laba2')}>Laba2</Button>
          <Button variant={"outlined"} style={{flexGrow: 1}} onClick={(e) => handleSetLaba(e, 'laba3')}>Laba3</Button>
          <Button variant={"outlined"} style={{flexGrow: 1}} onClick={(e) => handleSetLaba(e, 'laba4')}>Laba4</Button>
          <Button variant={"outlined"} style={{flexGrow: 1}} onClick={(e) => handleSetLaba(e, 'laba5')}>Laba5</Button>
        </div>

        <div style={{flexGrow: 1}}>

          {((value) => {
            if (value === "laba2") {
              return (
                <Laba2 handleSetLoadgin={handleSetLoadgin}/>
              )
            } else if (value === 'laba3') {
              return <Laba3ImEx handleSetLoadgin={handleSetLoadgin}/>
            } else if (value === 'laba4') {
              return <Laba4 handleSetLoadgin={handleSetLoadgin}/>
            } else if (value === "laba5") {
              return <Laba5 handleSetLoadgin={handleSetLoadgin}/>
            }
          })(callLaba)}

        </div>
      </div>
    </React.Fragment>
  );
};

export default Plots;
