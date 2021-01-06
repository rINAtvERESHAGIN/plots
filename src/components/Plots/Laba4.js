import React, {useEffect, useState} from "react";
import Plot from 'react-plotly.js';
import {Grid} from "@material-ui/core";


const Laba4 = props => {
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

    Plots.push(lab4ZScheme(0.1));
    Plots.push(lab4Implicit(0.1));

    Plots.push(lab4ZScheme(0.05));
    Plots.push(lab4Implicit(0.05));

    Plots.push(lab4ZScheme(0.01, 1));
    Plots.push(lab4Implicit(0.01, 1));

    // console.log('Plots', Plots.map((_, i, a) => a.slice(i * 2, i * 2 + 2)).filter(mass => mass.length))

    setPlots([...Plots]);
    handleSetLoadgin(false);

  }, []);


  const fLeft = (m1, m2, sigma, n, dt) => {
    return Math.exp(-(Math.pow(-m1 / sigma, 2))) + Math.exp(-(Math.pow((-m2 / sigma), 2)));
  }

  const lab4ZScheme = (dt) => {
    const XL = 11;
    const TL = 10;
    const L = 14;
    const m1 = 15 * L / 40;
    const m2 = 25 * L / 40;
    const sigma = L / 12.6;
    const dx = 0.05;

    const XN = parseInt((XL - 0) / dx + 1, 10);
    const TN = parseInt((TL - 0) / dt + 1, 10);

    let C = Array.from(new Array(XN), _ => Array(TN).fill(0));

    for (let j = 0; j < XN; j++) {
      C[j][0] = Math.exp(-Math.pow(((j + 1) * dx - m1) / sigma, 2)) + Math.exp(
        -Math.pow(((j + 1) * dx - m2) / sigma, 2));
    }

    for (let n = 0; n < TN - 1; n++) {
      C[0][n + 1] = fLeft(m1, m2, sigma, n + 1, dt)

      for (let j = 1; j < XN - 1; j++) {
        C[j][n + 1] = ((0.5 * C[j - 1][n + 1] * dt / dx) + (0.5 * dt / dx * (C[j][n] - C[j + 1][n])) +
          C[j][n]) / (1 + 0.5 * dt / dx);
      }

      const j = XN - 1;
      C[j][n + 1] = ((0.5 * C[j - 1][n + 1] * dt / dx) + (0.5 * dt / dx * (C[j - 1][n] - C[j][n])) + C[j][n]) / (
        1 + 0.5 * dt / dx);
    }

    // return
    const plotData = createChartData(C, XL, dx);
    return (<Plot
      data={plotData}
      autosize={true}
      layout={{width: "1400px", height: "800px", title: `Z - схема dt= ${dt}`}}
      config={config}
    />)
  }

  const lab4Implicit = (dt) => {
    const XL = 11;
    const TL = 10;
    const L = 14;
    const m1 = 15 * L / 40;
    const m2 = 25 * L / 40;
    const sigma = L / 12.6;
    const dx = 0.05;

    const XN = parseInt((XL - 0) / dx + 1, 10);
    const TN = parseInt((TL - 0) / dt + 1, 10);

    let C = Array.from(new Array(XN), _ => Array(TN).fill(0));

    for (let j = 0; j < XN; j++) {
      C[j][0] = Math.exp(-Math.pow(((j + 1) * dx - m1) / sigma, 2)) + Math.exp(
        -Math.pow(((j + 1) * dx - m2) / sigma, 2));
    }

    for (let n = 0; n < TN - 1; n++) {
      C[0][n + 1] = fLeft(m1, m2, sigma, n + 1, dt);
      for (let j = 1; j < XN - 1; j++) {
        // console.log('j', j);
        C[j][n + 1] = (C[j][n] + C[j - 1][n + 1] * dt / dx) / (1 + dt / dx)
      }
    }
    const plotData = createChartData(C, XL, dx);
    return (<Plot
      data={plotData}
      autosize={true}
      layout={{width: "1400px", height: "800px", title: `Левый угол dt= ${dt}`}}
      config={config}
    />)
  };

  const createChartData = (C, XL, dx) => {

    const lineX = [];
    for (let xVal = 0; xVal < XL; xVal += dx) {
      lineX.push(xVal.toFixed(1))
    }
    const chartData = [];
    for (let i = 0; i < C[0].length; i++) {
      if (i % 25 === 0) {
        const lineY = C.map((col) => col[i]);
        chartData.push({x: lineX, y: lineY, type: "scatter"});
      }
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


export default Laba4;
