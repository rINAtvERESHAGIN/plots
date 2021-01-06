import React, {useEffect, useState} from "react";
import Plot from 'react-plotly.js';
import {Grid} from "@material-ui/core";


const Laba3ImEx = props => {
  const [plots, setPlots] = useState([]);
  const {handleSetLoadgin} = props;

  let config = {
    toImageButtonOptions: {
      format: 'png', // one of png, svg, jpeg, webp
      filename: 'custom_image',
      width: 1920,
      height: 1080,
      scale: 1
    }
  };

  useEffect(() => {
    let Plots = [];
    // console.log('did mount ');

    Plots.push(lab3Explicit(0.01, 0.1));
    Plots.push(lab3Implicit(0.01, 0.1));

    Plots.push(lab3Explicit(0.05, 0.5));
    Plots.push(lab3Implicit(0.05, 0.5));

    Plots.push(lab3Explicit(0.1, 1));
    Plots.push(lab3Implicit(0.1, 1));

    // console.log('Plots', Plots.map((_, i, a) => a.slice(i * 2, i * 2 + 2)).filter(mass => mass.length))

    setPlots([...Plots]);
    handleSetLoadgin(false);

  }, []);


  const f = (A, j, dx, n, dt) => {
    return A * Math.exp(1 * dx) * (1 + n * dt)
  }

  const fLeft = (A, n, dt) => {
    return A * n * dt;
  }

  const lab3Explicit = (dt, dx) => {
    const XL = 1;
    const TL = 1;
    const A = 10;

    const XN = parseInt((XL - 0) / dx + 1, 10);
    const TN = parseInt((TL - 0) / dt + 1, 10);

    let C = Array.from(new Array(XN), _ => Array(TN).fill(0));

    for (let n = 1; n < TN - 1; n++) {
      C[1][n + 1] = fLeft(A, n + 1, dt);

      for (let j = 1; j < XN; j++) {
        C[j][n + 1] = C[j][n] + f(A, j, dx, n + 1, dt) * dt - (dt / dx) * (C[j][n] - C[j - 1][n])
      }
    }

    // return
    const plotData = createChartData(C, XL, dx);
    return (<Plot
      data={plotData}
      autosize={true}
      layout={{width: "1400px", height: "800px", title: `Явный dt= ${dt} dx= ${dx}`}}
      config={config}
    />)
  }

  const lab3Implicit = (dt, dx) => {
    const XL = 1;
    const TL = 1;
    const A = 7;

    const XN = parseInt((XL - 0) / dx + 1, 10);
    const TN = parseInt((TL - 0) / dt + 1, 10);

    let C = Array.from(new Array(XN), _ => Array(TN).fill(0));

    for (let n = 1; n < TN - 1; n++) {
      C[1][n + 1] = fLeft(A, n + 1, dt);

      for (let j = 1; j < XN; j++) {
        C[j][n + 1] = (C[j][n] + C[j - 1][n + 1] * (dt / dx) + f(A, j, dx, n, dt) * dt) / (1 + dt / dx);
      }
    }

    const plotData = createChartData(C, XL, dx);
    return (<Plot
      data={plotData}
      autosize={true}
      layout={{width: "1400px", height: "800px", title: `Неявный dt= ${dt} dx= ${dx}`}}
      config={config}
    />)
  };

  const createChartData = (C) => {
    const XL = 1;
    const dx = 0.1;

    const lineX = [];
    for (let xVal = 0; xVal < XL; xVal += dx) {
      lineX.push(xVal.toFixed(1))
    }
    // console.log('lineX', lineX)
    const chartData = [];
    for (let i = 0; i < C[0].length; i++) {
      const lineY = C.map((col) => col[i]);
      chartData.push({x: lineX, y: lineY, type: "scatter"});
    }

    return chartData;
  }


  return (
    <React.Fragment>
      <Grid container justify="center" spacing={1}>
        {plots
          .map((_, i, a) => a.slice(i * 2, i * 2 + 2))
          .filter(mass => mass.length)
          .map((mass, index) => (
            <Grid key={index} container item xs={12} spacing={3}>
              {mass.map(elem => (
                <Grid item xs={6}>
                  {elem}
                </Grid>
              ))}
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
};


export default Laba3ImEx;
