const socket = io()

const $editortextArea = document.querySelector('#editor')
const editor = CodeMirror.fromTextArea($editortextArea, {
    lineNumbers: true
})

editor.on('change', (a, b) => {
    if (b.origin === 'setValue') {
        return
    }
    const code = editor.getValue()
    socket.emit('codeUpdated', code, () => {
        console.log('Sent to server')
    })
})

socket.on('updatedCode', (code) => {
    console.log('Updating: ' + code)
    // const coords = editor.cursorCoords(false, 'local')
    const coords = editor.getCursor()
    console.log(coords)
    editor.setValue(code.code)
    editor.setCursor(coords)
})