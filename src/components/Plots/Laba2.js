import React, {useEffect, useState} from "react";
import Plot from "react-plotly.js";

const Laba2 = props => {
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
    Plots.push(laba2());
    // console.log('laba2 ', Plots);
    setPlots([...Plots]);
    handleSetLoadgin(false);
  }, []);


  const createChartData = (C, XL, dx) => {
    // const XL = 0.2;
    // const dx = 0.01;

    const lineX = [];


    for (let xVal = 0; xVal < XL + dx; xVal += dx) {
      lineX.push(xVal.toFixed(2));
    }

    const chartData = [];

    for (let i = 0; i < C[0].length; i++) {
      const lineY = C.map((col) => col[i]);
      chartData.push({x: lineX, y: lineY, type: "scatter"});
    }

    return chartData;
  }

  const laba2 = () => {
    const XL = 0.4;
    const D = 5e-6;
    const Re = 3;
    const d = 1e-2;

    const TL = 10e4;
    const Pr = 400;
    const cs = 10;
    const dt = 50;
    const dx = 0.01;

    const XN = parseInt((XL - 0) / dx + 1, 10);
    const TN = parseInt((TL - 0) / dt + 1, 10);

    let C = Array.from(new Array(XN), _ => Array(TN).fill(0));

    for (let j = 0; j < XL + dx; j += dx) {
      const fixedJ = j.toFixed(2);
      let index = parseInt(fixedJ * 100, 10);
      if (j === 0.2900000000000001) {
        index = 29;
      }
      const result = 200 + (50 * j.toFixed(2) * dx);

      C[index][0] = result;
    }


    let a = -(D * dt) / Math.pow(dx, 2);
    let b = 1 + 2 * ((D * dt) / Math.pow(dx, 2));
    let c = a;
    let nu = D * (1 + 0.5 * (0.55 * Math.pow(Re, 0.5) * Math.pow(Pr, (1 / 3)))) / d;

    for (let n = 0; n < TN - 1; n++) {
      let alfa = [0];
      let beta = [200];

      for (let j = 1; j < XN - 1; j++) {
        alfa.push(-(a / (b + c * alfa[j - 1])));
        beta.push((C[j][n] - c * beta[j - 1]) / (b + c * alfa[j - 1]))
      }
      C[XN - 1][n + 1] = (nu * cs * dx + beta[XN - 2]) / (1 - alfa[XN - 2] + nu * dx)

      for (let j = XN - 2; j > -1; j--) {
        C[j][n + 1] = alfa[j] * C[j + 1][n + 1] + beta[j];
      }
    }

    const plotData = createChartData(C, XL, dx);

    /*посчитать и вытащить из двумерного массива стоблцы по C */

    return (
      <Plot
        key={1}
        data={plotData}
        autosize={true}
        layout={{width: "1400px", height: "800px", title: 'laba2'}}
        config={config}
      />
    )
  };


  return (
    <React.Fragment>
      {plots.map(plot => plot)}
    </React.Fragment>
  )
};

export default Laba2;
