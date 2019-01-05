import {h} from 'preact'

interface ControlsProps {
    onClickUndo: () => void
    onClickNewGame: () => void 
}

export default function Controls(props: ControlsProps): JSX.Element {
    return (
        <div class="controls">
            <button class="controls__new-game" onClick={props.onClickNewGame}>New Game</button>
            <button class="controls__undo" onClick={props.onClickUndo}>Undo</button>
        </div>
    )
}