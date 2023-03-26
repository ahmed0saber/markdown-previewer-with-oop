import LocalStorageHandler from "./local-storage-handler.js"
import DocsDetailsHandler from "./docs-details-handler.js"

const tabBtns = document.querySelectorAll(".tab-btn")
const markdownTextarea = document.querySelector(".markdown-textarea")

class MarkdownPreviewer{
    static init() {
        markdownTextarea.value = LocalStorageHandler.getData()
        MarkdownPreviewer.displayCompiledHtml()
        DocsDetailsHandler.displayData()

        tabBtns.forEach(btn => {
            btn.addEventListener("click", () => MarkdownPreviewer.handleTabNavigation(btn))
        })

        markdownTextarea.addEventListener("keyup", () => {
            MarkdownPreviewer.displayCompiledHtml()
            LocalStorageHandler.setData(markdownTextarea.value)
        })
    }

    static handleTabNavigation(currentBtn) {
        const tabContainers = document.querySelectorAll(".tab-container")
        const currentContainer = document.querySelector(`.${currentBtn.dataset.tab}-tab-container`)
        tabContainers.forEach(container => {
            container.classList.remove("active")
        })
        currentContainer.classList.add("active")

        tabBtns.forEach(btn => {
            btn.classList.remove("active")
        })
        currentBtn.classList.add("active")
    }

    static displayCompiledHtml() {
        const previewTabContainer = document.querySelector(".preview-tab-container")
        let htmlToBeRendered = ""
        if (markdownTextarea.value.trim().length === 0) {
            htmlToBeRendered = marked.parse("Nothing to be rendered, try typing something in the Markdown tab.")
        } else {
            htmlToBeRendered = marked.parse(markdownTextarea.value)
        }
        previewTabContainer.innerHTML = htmlToBeRendered
    }
}

MarkdownPreviewer.init()
