import sys
import os

from PySide2.QtGui import QGuiApplication
from PySide2.QtQml import QQmlApplicationEngine
from PySide2.QtCore import QObject, QTimer, Slot, Signal

import logging
import coloredlogs

from Blockchain import Chain, load_chain_from_file

logging.basicConfig(
    format="%(asctime)s %(levelname)-8s %(message)s",
    level=logging.DEBUG,
    datefmt="%Y-%m-%d %H:%M:%S",
)

coloredlogs.install(level="DEBUG")


class QtAppInterface(QObject):
    def __init__(self):
        QObject.__init__(self)

        self.chain = None
        self.wallet_key = None

    @Slot(str)
    def loadChain(self, path):
        if path.startswith("file://"):
            path = path[len("file://") :]
        try:
            self.chain = load_chain_from_file(path)
            logging.info(f"Load {path} successful")
        except Exception as e:
            logging.error(f"Load {path} failed")
            logging.error(e)
            # show popup that it failed
            return
        logging.info(self.chain)


if __name__ == "__main__":
    app = QGuiApplication(sys.argv)
    engine = QQmlApplicationEngine()
    engine.load(os.path.join(os.path.dirname(__file__), "pre_home.qml"))

    main = QtAppInterface()
    engine.rootContext().setContextProperty("backend", main)

    if not engine.rootObjects():
        sys.exit(-1)
    sys.exit(app.exec_())
