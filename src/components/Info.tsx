import {h} from 'preact'


interface InfoProps {
    score: number
}

export default function Info(props: InfoProps): JSX.Element {
    return (
        <div class="info">
            <div class="info__score">Score: {props.score}</div>
        </div>
    )
}