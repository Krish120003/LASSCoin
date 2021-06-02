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
    title: qsTr("LASSCoin Wallet")

    Image {
        id: coinLogo
        x: 103
        width: 294
        height: 294
        anchors.top: parent.top
        source: "assets/coin.svg"
        anchors.topMargin: 48
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
        anchors.top: coinLogo.bottom
        anchors.topMargin: 0
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

    Item {
        id: controls
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.top: title.bottom
        anchors.bottom: parent.bottom
        anchors.rightMargin: 32
        anchors.leftMargin: 32
        anchors.bottomMargin: 32
        anchors.topMargin: 32

        Column {
            id: column
            anchors.fill: parent
            spacing: 4

            Rectangle {
                id: loadBlockChainButton
                height: parent.height / 4 - parent.spacing / 4

                color: "#ffdd80"
                radius: 16
                border.width: 0
                anchors.left: parent.left
                anchors.right: parent.right
                anchors.leftMargin: 0
                anchors.rightMargin: 0

                Text {
                    id: loadBlockChainButtonText
                    text: qsTr("Load Blockchain")
                    anchors.fill: parent
                    horizontalAlignment: Text.AlignHCenter
                    verticalAlignment: Text.AlignVCenter
                    font.pixelSize: 24
                }

                MouseArea {
                    id: loadBCmouseArea
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: {
                        parent.color = "#ffd254"
                    }
                    onExited: {
                        parent.color = "#ffdd80"
                    }
                }
            }

            Item {
                id: item1
                height: 200
                anchors.left: parent.left
                anchors.right: parent.right
                anchors.bottom: parent.bottom
                anchors.bottomMargin: 0
                anchors.rightMargin: 0
                anchors.leftMargin: 0
            }
        }
    }
}

/*##^##
Designer {
    D{i:0;formeditorZoom:0.75}D{i:1}D{i:3}D{i:4}D{i:9}D{i:7}D{i:10}D{i:6}D{i:5}
}
##^##*/
