import {h} from 'preact'


interface SquareProps {
    value: number
}

export default function Square(props: SquareProps): JSX.Element {
    return (
        <div class="board__square">
            {props.value}
        </div>
    )
}