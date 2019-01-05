import * as R from 'ramda'

import {randomInt} from './utils'


export const enum Direction { Up, Right, Down, Left }


/**
 * Namespace of board operations used within the game logic.
 * A board is simply a 4x4 matrix.
 * All operations return a copy.
 */
export namespace BoardOps {
    /**
     * Generator that returns rows of a board. 
     * 
     * @param board - Input board
     */
    function* getRows(board: number[]) {
        for (let i = 0; i < 4; i++) {
            const row: number[] = []
            for (let j = 0; j < 4; j++) {
                row.push(board[(i * 4) + j])
            }
            yield row
        }
    }

    /**
     * Generator that returns columns of a board.
     * 
     * @param board - Input board
     */
    function* getColumns(board: number[]) {
        for (let i = 0; i < 4; i++) {
            const column: number[] = []
            for (let j = 0; j < 4; j++) {
                column.push(board[i + (j * 4)])
            }
            yield column
        }
    }

    /**
     *  Rotates a board 90 degrees to the right. 
     * 
     * @param board - Board to be rotated
     */
    export function rotateRight(board: number[]): number[] {
        const rotated: number[] = []
        for (const column of getColumns(board)) {
            rotated.push(...column.reverse())
        }
        return rotated
    }

    /**
     * Rotates a board 90 degrees to the left.
     * 
     * @param board - Board to be rotated
     */
    export function rotateLeft(board: number[]): number[] {
        const rotated: number[] = []
        for (const column of getColumns(board)) {
            rotated.unshift(...column)
        }
        return rotated
    }

    export function slideRowRight(row: number[]): [number[], number] {
        row = row.slice()
        let score = 0

        for (let i = 3; i > 0; i--) {
            if (R.all(R.equals(0))(row.slice(0, i))) {
                break
            }

            if (row[i] === 0) {
                for (let j = (i-1); j >= 0; j--) {
                    if (row[j] !== 0) {
                        row[i] = row[j]
                        row[j] = 0
                        break
                    }
                }
                i++
            }
            else {
                for (let j = (i-1); j >= 0; j--) {
                    if (row[j] === 0) {
                        continue
                    }
                    else if (row[j] === row[i]) {
                        score += row[i]
                        row[i] += row[j]
                        row[j] = 0 
                        break
                    }
                    else {
                        break
                    }
                }
            }
        }

        return [row, score]
    }

    export function slideRowLeft(row: number[]): [number[], number] {
        row = row.slice()
        let score = 0

        for (let i = 0; i < 3; i++) {
            if (R.all(R.equals(0))(row.slice(i + 1, 4))) {
                break
            }

            if (row[i] === 0) {
                for (let j = (i+1); j <= 3; j++) {
                    if (row[j] !== 0) {
                        row[i] = row[j]
                        row[j] = 0
                        break
                    }
                }
                i--
            } else {
                for (let j = (i+1); j <= 3; j++) {
                    if (row[j] === 0) {
                        continue
                    } else if (row[j] === row[i]) {
                        score += row[i]
                        row[i] += row[j]
                        row[j] = 0 
                        break
                    } else {
                        break
                    }
                }
            }
        }

        return [row, score]
    }


    export function slideRight(matrix: number[]): [number[], number] {
        const m: number[] = []
        let score: number = 0

        for (const row of getRows(matrix)) {
            const [rowSlid, rowScore] = slideRowRight(row)

            m.push(...rowSlid)
            score += rowScore 
        }

        return [m, score] 
    }

    export function slideUp(matrix: number[]): [number[], number] {
        const m: number[] = []
        let score: number = 0

        // Rotate right -> slide rows right -> rotate left
        for (const row of getRows(rotateRight(matrix))) {
            const [rowSlid, rowScore] = slideRowRight(row)

            m.push(...rowSlid)
            score += rowScore 
        }

        return [rotateLeft(m), score] 
    }

    export function slideLeft(matrix: number[]): [number[], number] {
        let m: number[] = []
        let score: number = 0

        for (const row of getRows(matrix)) {
            const [rowSlid, rowScore] = slideRowLeft(row)

            m.push(...rowSlid)
            score += rowScore 
        }

        return [m, score] 
    }

    export function slideDown(matrix: number[]): [number[], number] {
        const m: number[] = []
        let score: number = 0

        // Rotate right -> slide rows left -> rotate left
        for (const row of getRows(rotateRight(matrix))) {
            const [rowSlid, rowScore] = slideRowLeft(row)

            m.push(...rowSlid)
            score += rowScore 
        }

        return [rotateLeft(m), score] 
    }

    export function checkWin(matrix: number[]): boolean {
        return R.any(value => value >= 2048, matrix) 
    }

    export function newSquare(matrix: number[]): number[] {
        // Indexes/squares with the value zero
        const zeroIndexes = matrix.map((value, index) => value === 0 ? index : -1)
                                  .filter(value => value >= 0 ? true : false)

        // Is the board full?
        if (zeroIndexes.length === 0) {
            return matrix
        }

        // Select a random index
        const idx = zeroIndexes[randomInt(0, zeroIndexes.length - 1)]

        // Randomly assign 2 or 4 to the selected index
        const m = matrix.slice()
        m[idx] = randomInt(0, 1) ? 2 : 4 

        return m
    }
}