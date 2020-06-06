const socket = io()

const usersTemplate = document.querySelector('#users-template').innerHTML

const { username, pagename } = Qs.parse(location.search, { ignoreQueryPrefix: true })
// console.log(username, pagename)



socket.on('updatedCode', ({ pageName, pageData }) => {
    // console.log('Updating: ' + pageData)
    const coords = editor.getCursor()
    // console.log(coords)
    editor.setValue(pageData)
    editor.setCursor(coords)
    editor.focus()
})

socket.on('pageUsers', (users) => {
    // console.log(JSON.stringify(users))
    const html = Mustache.render(usersTemplate, {
        users
    })
    document.querySelector('#users').innerHTML = html
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

editor.setSize('100%', '700px')

editor.on('change', (a, b) => {
    if (b.origin === 'setValue') {
        return
    }
    const code = editor.getValue()
    socket.emit('codeUpdated', code, () => {
        console.log('Sent to server')
    })
})