import QtQuick 2.12
import QtQuick.Window 2.15
import QtQuick.Controls 2.15

Window {
    id: window
    width: 500
    height: 800
    minimumHeight: 800
    maximumHeight: 800
    minimumWidth: 500
    maximumWidth: 500
    visible: true
    title: qsTr("Hello World 2")

    Image {
        id: coinLogo
        x: 103
        width: 294
        height: 294
        anchors.top: parent.top
        source: "assets/coin.svg"
        anchors.topMargin: 64
        antialiasing: true
        mirror: false
        mipmap: true
        autoTransform: true
        asynchronous: true
        fillMode: Image.PreserveAspectFit
        sourceSize.width: parent.width
        sourceSize.height: parent.height // This line is important
    }

    Item {
        anchors.top: parent.top
        anchors.topMargin: 365
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.left: parent.left
        anchors.right: parent.right
        id: title
        x: 131
        y: 364
        width: 500
        height: 102

        Text {
            id: coinName
            x: 238
            text: qsTr("LASSCoin")
            anchors.top: parent.top
            font.pixelSize: 45
            horizontalAlignment: Text.AlignHCenter
            anchors.topMargin: 0
            anchors.horizontalCenter: parent.horizontalCenter
            font.bold: true
            font.family: "Verdana"
        }

        Text {
            id: walletText
            x: 238
            text: qsTr("Wallet")
            anchors.top: coinName.bottom
            font.pixelSize: 24
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.topMargin: 5
            font.family: "Verdana"
        }
    }
}

/*##^##
Designer {
    D{i:0;formeditorZoom:0.75}D{i:1}D{i:3}D{i:4}
}
##^##*/

