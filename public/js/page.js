const socket = io()

const { username, pagename } = Qs.parse(location.search, { ignoreQueryPrefix: true })
// console.log(username, pagename)



socket.on('updatedCode', ({ pageName, pageData }) => {
    console.log('Updating: ' + pageData)
    const coords = editor.getCursor()
    // console.log(coords)
    editor.setValue(pageData)
    editor.setCursor(coords)
})

socket.on('pageUsers', (users) => {
    console.log(JSON.stringify(users))
})

socket.emit('joinPage', {username, pagename}, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

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