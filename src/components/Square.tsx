import {h} from 'preact'


interface SquareProps {
    value: number
}

export default function Square(props: SquareProps): JSX.Element {
    const selfClass: string[] = ['board__square']
    selfClass.push('board__square--val-' + props.value.toString())

    return (
        <div class={selfClass.join(' ')}>
            {props.value}
        </div>
    )
}