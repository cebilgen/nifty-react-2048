import {h} from 'preact'


interface SquareProps {
    value: number
    shift?: number
    shiftDirection?: string
}

export default function Square(props: SquareProps): JSX.Element {
    const selfClass: string[] = ['board__square']
    selfClass.push('board__square--val-' + props.value.toString())

    if (props.shift !== undefined && props.shiftDirection !== undefined) {
        let animation = [
            'board__square--move', 
            props.shiftDirection,
            props.shift.toString()
        ].join('-')
        selfClass.push(animation)
    }

    return (
        <div class={selfClass.join(' ')}>
            {props.value}
        </div>
    )
}