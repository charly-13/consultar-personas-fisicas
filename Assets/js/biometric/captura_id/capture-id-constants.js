export const TOKEN = "TytwVkhsYzh6ckpaaDRKVS9xMTB5MDZuV2JsVTV1MTdTMU5DcE1iSDJ6ZW9nbjc5Qm1OeWJYamU4STEwTExOckxoZC9KZTAyY25iemNWd3hyMEFabjE1aEZPR05qc3NndFlldFJ6bzNYS3RRSU5wbDlxdmIvNCtEMmJzbnMwUG4=";

// optional, the app has default legends and colors
export const CONFIGURATION = {
  views: {
		instructions: false,
		preview: false,
	},
  customization: {
    fadCustomization: {
      colors: {
        primary: "#A70635",
      },
      buttons: {
        primary: {
          backgroundColor: "#A70635",
          labelColor: "#ffffff",
        },
      },
      fonts: {
        title: {
          fontSize: "25px",
          fontFamily: "system-ui",
        },
        subtitle: {
          fontSize: "17px",
          fontFamily: "system-ui",
        },
        content: {
          fontSize: "15px",
          fontFamily: "system-ui",
        },
        button: {
          fontSize: "17px",
          fontFamily: "system-ui",
        },
      },
    },
    moduleCustomization: {
      legends: {
        title: "Identificación",
        detection: {
          noDocument: "Coloque el documento en el recuadro",
          goodDocument: "No se mueva",
          bigDocument: "Aléjese",
          smallDocument: "Acérquese",
          invalidBack: "Coloque el frente",
          invalidFront: "Coloque el reverso",
          blurryDocument: "Documento poco legible",
        },
        subtitle: {
          front: "Frente",
          back: "Reverso",
        },
        instruction: {
          front: "Captura de identificación",
          back: "Captura de identificación",
        },
      },
      style: {
        common: {
          loader: {
            backgroundColor: "#000000",
            animationColor: "#FFFFFF",
            labelColor: "#FFFFFF",
          },
        },
        outerBackgroundColor: "#2b2b2b66",
        idDetectedOuterBackgroundColor: "#0a0a0ab3",
        detectionBorder: {
          initial: {
            color: "#FFFFFF",
            style: "solid",
            width: "4px",
          },
          warning: {
            color: "#FFDC45",
            style: "solid",
            width: "4px",
          },
          detected: {
            color: "#009895",
            style: "solid",
            width: "4px",
          },
        },
        instruction: {
          initial: {
            backgroundColor: "#000000b5",
            color: "#FFFFFF",
          },
          warning: {
            backgroundColor: "#FFDC45B5",
            color: "#FFFFFF",
          },
          detected: {
            backgroundColor: "#009895",
            color: "#FFFFFF",
          },
        },
      },
    },
  },
  pathDependencies: {
    //   imageDirectory: 'CUSTOM IMAGE URL',
    //   images: {
    // 	nativeCaptureInstruction: 'CUSTOM IMAGE URL'
    //   }
  },
};
