import {h, Component} from 'preact'
import * as R from 'ramda'
import * as Hammer from 'hammerjs'

import Info from './Info'
import Board from './Board'
import Controls from './Controls'
import { Direction, BoardOps } from '../logic'
import { delay } from '../utils'


interface GameState {
    board: number[]
    score: number
    shift?: number[]
    shiftDirection?: string 
    noChange: boolean[] 
    continue?: boolean
}

export default class Game extends Component<any, GameState> {
    private history: GameState[] = []
    private hammer?: HammerManager

    constructor(props: any) {
        super(props)
        this.newGame()
    }

    componentDidMount() {
        this.setupTouchControls()
    }

    componentDidUpdate() {
        if (this.isWon() && this.state.continue === undefined && this.hammer !== undefined) {
            this.hammer.get('swipe').set({enable: false})
        }
    }

    newGame() {
        this.setState({
            board: BoardOps.newSquare(R.repeat(0, 16)),
            score: 0,
            shift: undefined,
            shiftDirection: undefined,
            continue: undefined,
            noChange: R.repeat(false, 4)
        })

        this.history = []
    } 

    undo() {
        let lastState = this.history.pop()

        if (lastState !== undefined) {
            this.setState(lastState)
        }
    }

    isFinished(): boolean {
        return R.all(R.equals(true))(this.state.noChange)
    }

    isWon(): boolean {
        return BoardOps.checkWin(this.state.board)
    }

    onKeyDown(ev: KeyboardEvent) {
        if (this.isWon() && this.state.continue === undefined) {
            return
        }
        else if (ev.key === 'ArrowUp') {
            this.slideUp()
        }
        else if (ev.key === 'ArrowRight') {
            this.slideRight()
        }
        else if (ev.key === 'ArrowDown') {
            this.slideDown()
        } 
        else if (ev.key === 'ArrowLeft') {
            this.slideLeft()
        } 
        else if (ev.key === 'Backspace') {
            this.undo()
        }
    }

    setupTouchControls() {
        let eGameBoard = document.querySelector('.board') 
        if (eGameBoard === null) {
            return console.log('Touch query selector failed.')
        }

        this.hammer = new Hammer.Manager(eGameBoard)
        this.hammer.add(new Hammer.Swipe())
        this.hammer.add(new Hammer.Tap())

        this.hammer.on('swiperight', () => this.slideRight())
        this.hammer.on('swipeup',    () => this.slideUp())
        this.hammer.on('swipeleft',  () => this.slideLeft())
        this.hammer.on('swipedown',  () => this.slideDown())
        this.hammer.on('tap', () => {
            if (this.isWon() && this.state.continue === undefined && this.hammer !== undefined) {
                this.setState({continue: true})
                this.hammer.get('swipe').set({enable: true})
            }
        })
    }

    async slideUp() {
        const [slid, shift, score] = BoardOps.slideUp(this.state.board)

        if (R.equals(slid, this.state.board)) { 
            const noChange = this.state.noChange.slice()
            noChange[Direction.Up] = true
            return this.setState({noChange: noChange})
        }

        await this.shift(shift, 'up')

        this.history.push(this.state)

        this.setState({
            board: BoardOps.newSquare(slid),
            score: this.state.score + score,
            noChange: R.repeat(false, 4),
        })
    }

    async slideRight() {
        const [slid, shift, score] = BoardOps.slideRight(this.state.board)

        if (R.equals(slid, this.state.board)) { 
            const noChange = this.state.noChange.slice()
            noChange[Direction.Right] = true
            return this.setState({noChange: noChange})
        }

        await this.shift(shift, 'right')

        this.history.push(this.state)

        this.setState({
            board: BoardOps.newSquare(slid),
            score: this.state.score + score,
            noChange: R.repeat(false, 4),
        })
    }

    async slideDown() {
        const [slid, shift, score] = BoardOps.slideDown(this.state.board)

        if (R.equals(slid, this.state.board)) { 
            const noChange = this.state.noChange.slice()
            noChange[Direction.Down] = true
            return this.setState({noChange: noChange})
        }

        await this.shift(shift, 'down')

        this.history.push(this.state)

        this.setState({
            board: BoardOps.newSquare(slid),
            score: this.state.score + score,
            noChange: R.repeat(false, 4),
        })
    }

    async slideLeft() {
        const [slid, shift, score] = BoardOps.slideLeft(this.state.board)

        if (R.equals(slid, this.state.board)) { 
            const noChange = this.state.noChange.slice()
            noChange[Direction.Left] = true
            return this.setState({noChange: noChange})
        }

        await this.shift(shift, 'left')

        this.history.push(this.state)

        this.setState({
            board: BoardOps.newSquare(slid),
            score: this.state.score + score,
            noChange: R.repeat(false, 4),
        })
    }

    async shift(shift: number[], direction: string): Promise<void> {
        // Start slide animation
        this.setState({
            shift: shift,
            shiftDirection: direction,
        })

        // Wait for the animation to complete
        await delay(100)

        // Reset animation
        this.setState({
            shift: undefined,
            shiftDirection: undefined,
        })
    }

    render(): JSX.Element {
        return (
            <div class="game">
                <Info
                    score={this.state.score}
                    isWon={this.isWon()}
                    isFinished={this.isFinished()}
                    continue={this.state.continue}
                />
                <Board
                    onKeyDown={(ev: KeyboardEvent) => this.onKeyDown(ev)}
                    values={this.state.board}
                    shift={this.state.shift}
                    shiftDirection={this.state.shiftDirection}
                />
                <Controls
                    onClickUndo={() => this.undo()}
                    onClickNewGame={() => this.newGame()}
                />
            </div>
        )
    }
}