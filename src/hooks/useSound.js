import { useRef } from "react";
import buttonClickSound from "../assets/sounds/button-click.wav";

function useSound() {
    const audioRef = useRef(new Audio(buttonClickSound));

    const soundCorrect = () => {
        audioRef.current.load();
        audioRef.current.play();
    };

    return { soundCorrect };
}

export { useSound };
