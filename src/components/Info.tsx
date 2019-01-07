import {h} from 'preact'


interface InfoProps {
    isWon: boolean
    isFinished: boolean
    score: number
    continue?: boolean
}

export default function Info(props: InfoProps): JSX.Element {
    let overlayClass = ['info__overlay']
    let resultClass = ['info__result']
    let message = ''

    // Game is won and no more moves left
    if (props.isWon && props.isFinished) {
        overlayClass.push(overlayClass[0] + '--show')
        resultClass.push(resultClass[0] + '--won')
        message = "No moves left."
    } 
    // Game is won, but can still continue
    else if (props.isWon && props.continue === undefined) {
        overlayClass.push(overlayClass[0] + '--show')
        resultClass.push(resultClass[0] + '--won')
        message = "Tap to continue."
    }
    // Game is lost
    else if (props.isFinished) {
        overlayClass.push(overlayClass[0] + '--show')
        resultClass.push(resultClass[0] + '--lost')
    }

    return (
        <div class="info">
            <div class="info__score">Score: {props.score}</div>
            <div class={overlayClass.join(' ')}>
                <div class="info__overlay-bg" />
                <span class={resultClass.join(' ')}>
                    {props.isWon ? "You win!" : "You lost!"}
                </span>
                <span class="info__message">{message}</span>
            </div>
        </div>
    )
}