const users = []

const addUser = ({ id, username, pagename }) => {
    username = username.trim().toLowerCase()
    pagename = pagename.trim().toLowerCase()

    if (!username || !pagename) {
        return {
            error: 'Username and room are required!'
        }
    }

    const existingUser = users.find((user) => {
        return user.pagename === pagename && user.username === username
    })

    if (existingUser) {
        return {
            error: `{{username}} has already joined {{pagename}}`
        }
    }

    const user = {id, username, pagename}
    users.push(user)
    return { user }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersOnPage = (pagename) => {
    pagename = pagename.trim().toLowerCase()
    return users.filter((user) => user.pagename === pagename)
}

module.exports = {
    addUser,
    getUser,
    getUsersOnPage
}