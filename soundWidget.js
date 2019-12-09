export default class SoundWidget {
  // kun for matistikk
  // class SoundWidget {
  constructor(divElementId, config, answer = null, onAnswer, options) {
    this.divElementId = divElementId;
    let default_config = {
      icon: "help_outline"
    };
    if (!config.audioSrc)
      throw new Error(
        "No url to audio source provided. Must provide audioSrc in config!"
      );
    this.config = { ...default_config, ...config };
    this.audio = new Audio();
    this.audio.src = this.config.audioSrc;
    //debug
    window.au = this.audio;
    this.buildDOM();
    this.runscript();
  }

  buildDOM() {
    this.btn = document.createElement("div");
    this.btn.classList.add("sound-float");
    let icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.innerHTML = this.config.icon;
    this.btn.appendChild(icon);
    document.getElementById(this.divElementId).append(this.btn);
  }

  runscript() {
    this.btn.onclick = () => this.play();
  }

  play() {
    console.log("PRESS BTN");
    if (!this.audio.played.length || this.audio.ended) {
      console.log("START SOUND");
      this.audio.play().catch(e => console.warn(e));
      this.audio.onended = () => {
        console.log("END SOUND");
      };
    }
  }
}

var soundWidget = {
  scripts: [],
  links: [
    "/libs/soundWidget/soundWidget.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
  ],
  widgetClass: SoundWidget,
  contributesAnswer: false,
  jsonSchema: {
    title: "Sound widget",
    description: "Widget that adds floating button for sound playback",
    type: "object",
    properties: {
      icon: {
        type: "string",
        title: "Icon_name",
        description: "Material icon string"
      },
      audioSrc: {
        type: "string",
        title: "Audio_source",
        description: "URL to audio source"
      }
    }
  },

  // prettier-ignore
  jsonSchemaData: {
		"icon": "",
		"audioSrc": ""
	},
  // prettier-ignore
  configStructure: {
		"icon": "help_outline",//see https://material.io/resources/icons/?style=baseline default= help_outline
		"audioSrc": "https://sound-file"// url to audio source
	}
};
