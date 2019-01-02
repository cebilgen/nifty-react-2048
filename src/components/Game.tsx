import {h, Component} from 'preact'
import * as R from 'ramda'

import Board from './Board'


interface GameState {
    board: number[]
    score: number
    noChange: boolean[] 
}

export default class Game extends Component<any, GameState> {
    constructor(props: any) {
        super(props)
        this.newGame()
    }

    newGame() {
        this.setState({
            board: R.repeat(0, 16),
            score: 0,
            noChange: R.repeat(false, 4)
        })
    } 

    render(): JSX.Element {
        return (
            <div class="game">
                <Board
                    values={this.state.board}
                />
            </div>
        )
    }
}