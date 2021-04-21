// Pontos do dedo
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

//Style
const style = {
  0: { color: "green", size: 5 },
  1: { color: "green", size: 5 },
  2: { color: "green", size: 5 },
  3: { color: "green", size: 5 },
  4: { color: "green", size: 5 },
  5: { color: "green", size: 5 },
  6: { color: "green", size: 5 },
  7: { color: "green", size: 5 },
  8: { color: "green", size: 5 },
  9: { color: "green", size: 5 },
  10: { color: "green", size: 5 },
  11: { color: "green", size: 5 },
  12: { color: "green", size: 5 },
  13: { color: "green", size: 5 },
  14: { color: "green", size: 5 },
  15: { color: "green", size: 5 },
  16: { color: "green", size: 5 },
  17: { color: "green", size: 5 },
  18: { color: "green", size: 5 },
  19: { color: "green", size: 5 },
  20: { color: "green", size: 5 },
};

// Drawing function
export const drawHand = (predictions, ctx) => {
  // analisa se tem previsão
  if (predictions.length > 0) {
    // Faça um loop em cada previsão
    predictions.forEach((prediction) => {
      // Pegue pontos de referência
      const landmarks = prediction.landmarks;

      // Loop através dos dedos
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        //  Loop através de pares de juntas
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          // Obtenha pares de juntas
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          // Desenhe o caminho
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Percorra pontos de referência e desenhe-os
      for (let i = 0; i < landmarks.length; i++) {
        // Obtenha x pontos
        const x = landmarks[i][0];
        // Obtenha y pontos
        const y = landmarks[i][1];
        // Comece a desenhar
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);

        // Definir a cor da linha
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
      }
    });
  }
};