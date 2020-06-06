const pages = new Map()

const getPage = (pageName) => {
    pageData = pages.get(pageName)
    if (!pageData) {
        pageData = ''
        pages.set(pageName, pageData)
    }

    return {
        pageName,
        pageData
    }
}

const updatePage = ({ pageName, pageData }) => {
    pages.set(pageName, pageData)
}

module.exports = {
    getPage,
    updatePage
}