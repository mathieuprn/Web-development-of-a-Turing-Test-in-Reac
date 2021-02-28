import satellite from "../img/satellite.jpeg";
import imgTest from "../img/sar.jpg";
import turing from "../img/turing.jpeg";
import science from "../img/help_science.png";

export const WELCOME_INSTRUCTION = {}
export const WELCOME_BUTTON_TEST = "Let's start the test !"
export const WELCOME_BUTTON_EVALUATION = "Let's start the evaluation !"

export const WELCOME_LIST_TEST_IMAGE_TEXT = [
    {
        image: satellite,
        title: `What is the project ?`,
        text: `The goal of this project is to improve an Artificial Intelligence creating virtual SAR images.`
    },
    {
        image: imgTest,
        title: `What is SAR ?`,
        text: `A Synthetic Aperture Radar (SAR) is an imaging radar that processes received data to improve azimuth resolution. These images allow us to understand and protect the Planet, and manage its resources sustainably by detecting various meteorological phenomena and oceanic activities.`
    },
    {
        image: turing,
        title: `How to improve the IA ? `,
        text: `To improve the AI in question, we will perform a Turing Test. We will then show you virtual images made by the AI and real images. You will have to determine which ones are false and which ones are true. Your answers will be taken into account to improve the AI. `
    },
    {
        image: science,
        title: `Ready to help science ? `,
        text: `Are you ready to help science? To improve our artificial intelligence creating virtual SAR images? Let's not waste time, and let's start right away!`
    },

]