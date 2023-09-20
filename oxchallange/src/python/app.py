# app.py
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

board = [None for _ in range(9)]
myDepth = set()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/new_game', methods=['POST'])
def new_game():
    global board, myDepth
    board = [None for _ in range(9)]
    myDepth = set()
    return jsonify({"message": "New game started"}), 200


def is_winner(board, symbol):
    for row in range(0, 9, 3):
        if all([cell == symbol for cell in board[row:row+3]]):
            return True
    for col in range(3):
        if all([board[row+col] == symbol for row in range(0, 9, 3)]):
            return True
    if all([board[i] == symbol for i in [0, 4, 8]]):
        return True
    if all([board[i] == symbol for i in [2, 4, 6]]):
        return True
    return False

def is_full(board):
    return all(cell is not None for cell in board)

def minimax(board, depth, maximizing):
    global myDepth
    if depth not in myDepth:
        myDepth.add(depth)

    winx = is_winner(board, 'X')
    wino = is_winner(board, 'O')
    if winx:
        return 10 - depth
    if wino:
        return depth - 10
    if is_full(board):
        return 0

    if maximizing:
        max_eval = float('-inf')
        for i in range(9):
            if board[i] is None:
                board[i] = 'X'
                eval = minimax(board, depth + 1, False)
                board[i] = None
                max_eval = max(max_eval, eval)
        return max_eval
    else:
        min_eval = float('inf')
        for i in range(9):
            if board[i] is None:
                board[i] = 'O'
                eval = minimax(board, depth + 1, True)
                board[i] = None
                min_eval = min(min_eval, eval)
        return min_eval

def best_move(board):
    global myDepth
    myDepth = set()

    max_eval = float('-inf')
    move = None
    for i in range(9):
        if board[i] is None:
            board[i] = 'X'
            eval = minimax(board, 0, False)
            board[i] = None
            if eval > max_eval:
                max_eval = eval
                move = i
    return move

@app.route('/move', methods=['POST'])
def make_move():
    global board
    index = int(request.json['index'])
    board[index] = 'O'

    if is_winner(board, 'O'):
        return jsonify({'winner': 'O'})

    if is_full(board):
        return jsonify({'winner': 'tie'})

    ai_move = best_move(board)
    board[ai_move] = 'X'

    if is_winner(board, 'X'):
        return jsonify({'winner': 'X', 'ai_move': ai_move})

    if is_full(board):
        return jsonify({'winner': 'tie'})

    return jsonify({'ai_move': ai_move})


def initialize_game():
    # Set up your game board and other state variables
    board = [[' ']*3 for _ in range(3)]
    current_player = 'O'
    game_over = False
    return board, current_player, game_over


if __name__ == '__main__':
    app.run(debug=True)
