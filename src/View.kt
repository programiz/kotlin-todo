import org.w3c.dom.*
import kotlin.browser.document
import kotlin.dom.addClass

/**
 * View class which corresponds to the UI of the App
 */
class View {
    val newTodo = document.getElementById("new-todo") as HTMLInputElement
    val todoList = document.getElementById("todo-list") as HTMLUListElement

    /**
     * Display given todo items in the UI
     */
    fun displayItems(items: List<TodoListItem>) {
        todoList.innerHTML = ""
        items.forEach { addItem(it) }
    }

    /**
     * Sets the correct filter classes
     */
    fun setFilter(route: String) {
        val selectedFilter = document.querySelector(".filters .selected") as HTMLElement
        selectedFilter.className = ""

        val currentPage = document.querySelector(".filters [href=\"#/$route\"]") as HTMLElement
        currentPage.className = "selected"
    }

    /**
     * CLears new todo input
     */
    fun clearNewTodoInput() {
        newTodo.value = ""
    }

    /**
     * Adds item to the UI
     */
    fun addItem(item: TodoListItem) {

        // create List item
        var todoElement = document.createElement("li") as HTMLLIElement
        todoElement.setAttribute("data-id", item.id)

        var checkMark = document.createElement("input") as HTMLInputElement
        checkMark.type = "checkbox"
        checkMark.addClass("toggle")
        todoElement.append(checkMark)

        var label = document.createElement("label") as HTMLLabelElement
        label.innerHTML = item.title
        todoElement.append(label)

        var destroyButton = document.createElement("button") as HTMLButtonElement
        destroyButton.addClass("destroy")
        todoElement.append(destroyButton)

        if (item.completed) {
            checkMark.checked = true
            todoElement.addClass("completed")
        }

        todoList.append(todoElement)
    }

    /**
     * Removes item from the UI
     */
    fun removeItem(id: String) {
        var todoElement = document.querySelector("[data-id=\"$id\"]") as HTMLLIElement

        todoList.removeChild(todoElement)
    }

    /**
     * Toggle item's completed status in the UI
     */
    fun toggleItem(id: String, completed: Boolean) {
        var todoElement = document.querySelector("[data-id=\"$id\"]") as HTMLLIElement

        todoElement.className = if (completed) "completed" else ""
    }
}