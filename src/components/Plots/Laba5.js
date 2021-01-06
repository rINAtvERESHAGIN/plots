import React, {useEffect, useState} from "react";
import Plot from "react-plotly.js";

const Laba5 = props => {
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
    Plots.push(laba5());
    // console.log('laba2 ', Plots);
    setPlots([...Plots]);
    handleSetLoadgin(false);
  }, []);


  const createChartData = (C, XN, dx/*XL, dx*/) => {

    console.log(C.map((col) => col[1]));
    const lineX = [];
    for (let xVal = 0; xVal < XN + dx; xVal += dx) {
      lineX.push(xVal.toFixed(2));
    }
    const chartData = [];
    for (let i = 0; i < C[0].length; i++) {
      const lineY = C.map((col) => col[i]);
      chartData.push({x: lineX, y: lineY, type: "scatter"});
    }

    return chartData;
  }

  const D = (k) => {
    return k / 100;
  }

  const coeff = (n) => {
    return Math.pow(n + 2, 2) - 1
  }

  const laba5 = () => {
    let k = 0;
    const dt = 0.01;
    const dx = 0.1;
    // const coeff = 1;

    const XN = parseInt((1 - 0) / dx + 1, 10);
    const TN = parseInt((1 - 0) / dt + 1, 10);

    let C = Array.from(new Array(XN), _ => Array(TN).fill(0));

    for (let n = 0; n < TN - 1; n++) {
      const t = n * dt;
      k = t + 3.5;

      let alfa = [0];
      let beta = [];
      beta[0] = Math.exp(n * dt) - 1;

      let a = -(D(k) * (Math.sqrt(3.14) * 0.5 * Math.pow(dt, 0.5))) / Math.pow(dx, 2);
      let b = 1 + ((2 * D(k) * (Math.sqrt(3.14) * 0.5 * Math.pow(dt, 0.5))) / Math.pow(dx, 2));
      let c = -(D(k) * (Math.sqrt(3.14) * 0.5 * Math.pow(dt, 0.5))) / Math.pow(dx, 2);

      for (let j = 1; j < XN - 1; j++) {
        let f = k * (Math.pow(j * dx, 2) * Math.pow(dt, 1.5) * coeff(n) / Math.sqrt(3.14) - 2 * D(k) * Math.pow(
          n * dt, 2));
        alfa[j] = -(a / (b + c * alfa[j - 1]));
        beta[j] = (((C[j][n] * 0.5) + f * (Math.sqrt(3.14) * 0.5 * Math.pow(dt, 0.5))) - c * beta[j - 1]) / (
          b + c * alfa[j - 1]);
      }

      C[XN - 1][n + 1] = k * Math.pow(((n + 1) * dt), 2);

      for (let j = XN - 2; j > -1; j--) {
        C[j][n + 1] = alfa[j] * C[j + 1][n + 1] + beta[j];
      }
    }

    const plotData = createChartData(C, XN, dx);

    /*посчитать и вытащить из двумерного массива стоблцы по C */
    return (
      <Plot
        key={1}
        data={plotData}
        autosize={true}
        layout={{width: "1400px", height: "800px", title: 'Лаба 5'}}
        config={config}
      />
    )
  }


  return (
    <React.Fragment>
      {plots.map(plot => plot)}
    </React.Fragment>
  )
};

export default Laba5;
