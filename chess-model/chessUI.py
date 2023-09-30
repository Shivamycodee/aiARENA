import chess
import chess.svg
from IPython.display import display, SVG


board = chess.Board("8/8/8/8/4N3/8/8/8 w - - 0 1")

board_svg = chess.svg.board(
    board,
    fill=dict.fromkeys(board.attacks(chess.E4), "#cc0000cc"),
    arrows=[chess.svg.Arrow(chess.E4, chess.F6, color="#0000cccc")],
    squares=chess.SquareSet(chess.BB_DARK_SQUARES & chess.BB_FILE_B),
    size=350,
)  

# display(SVG(board_svg))

with open("output.svg", "w") as f:
    f.write(board_svg)
