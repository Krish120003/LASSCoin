import sys
import os

from PySide2.QtGui import QGuiApplication
from PySide2.QtQml import QQmlApplicationEngine
from PySide2.QtCore import QObject, QTimer, Slot, Signal


import logging
import coloredlogs

logging.basicConfig(
    format="%(asctime)s %(levelname)-8s %(message)s",
    level=logging.DEBUG,
    datefmt="%Y-%m-%d %H:%M:%S",
)

coloredlogs.install(level="INFO")


class QtAppInterface(QObject):
    def __init__(self):
        QObject.__init__(self)

    @Slot(str)
    def loadChain(self, path):
        print(path)


if __name__ == "__main__":
    app = QGuiApplication(sys.argv)
    engine = QQmlApplicationEngine()
    engine.load(os.path.join(os.path.dirname(__file__), "pre_home.qml"))

    main = QtAppInterface()
    engine.rootContext().setContextProperty("backend", main)

    if not engine.rootObjects():
        sys.exit(-1)
    sys.exit(app.exec_())
