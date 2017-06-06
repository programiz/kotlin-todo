import org.w3c.dom.*
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Date

fun main(args: Array<String>) {
    val storage = Storage(dbName = "todoList")
    val view = View()

    App(storage, view)
}

/**
 * App class for Todo list
 *
 * This class creates and hooks the functionalities for todo
 */
class App(val storage: Storage, val view: View) {
    init {

        // Hooks for the HTMLElements
        // Add new-todo button
        val newTodo = document.getElementById("new-todo") as HTMLInputElement
        on(newTodo, "keyup", {
            it.preventDefault()

            it as KeyboardEvent
            if(it.keyCode ==  13) { // Return key
                val item = it.target as HTMLInputElement
                if (item.value != "")
                    addTodo(item.value)
            }
        })


        val todoList = document.querySelector(".todo-list") as HTMLElement

        // Destroy button
        delegate(todoList, ".destroy", "click", { element: HTMLElement, _: Event ->
            val item = element.parentNode as HTMLElement
            removeTodo(item.dataset["id"]!!)
        })

        // Toggle button
        delegate(todoList, ".toggle", "click", { element: HTMLElement, _: Event ->
            element as HTMLInputElement

            val item = element.parentNode as HTMLElement
            val id = item.dataset["id"]
            toggleTodo(id!!, element.checked)
        })

        // Refresh items on hash change
        window.addEventListener("hashchange", { refreshItems() })

        // Load filters on first load
        refreshItems()
    }

    /**
     * Creates an event listener for the given target element
     */
    private fun on(target: Element, type: String, callback: (Event) -> Unit, useCapture: Boolean = false) {
        target.addEventListener(type, callback, !!useCapture)
    }

    /**
     * Creates a delegate event listener.
     * Hooks the event listener when the given selector element is present.
     */
    private fun delegate(target: HTMLElement, selector: String, type: String, handler: (HTMLElement, Event) -> Unit) {
        val dispatchEvent = { event: Event ->
            val targetElement = event.target as HTMLElement
            val potentialElements = document.querySelectorAll(selector)
            val hasMatch = potentialElements.asList().any{ it == targetElement }

            if (hasMatch) {
                handler.invoke(targetElement, event)
            }
        }

        val useCapture = type == "blur" || type == "focus"
        on(target, type, dispatchEvent, useCapture)
    }

    /**
     * Refreshes the items list
     */
    private fun refreshItems() {
        setFilter(window.location.hash)
    }

    /**
     * Sets the filter to the current hash location
     * and recreates the items list
     */
    fun setFilter(location: String) {
        var route = location.substringAfter('/').capitalize()

        val items = when (route) {
            "Active" -> storage.find { !it.completed }
            "Completed" -> storage.find { it.completed }
            else -> storage.find { true }
        }

        view.setFilter(route.toLowerCase())
        view.displayItems(items)
    }

    /**
     * Adds a todo list item
     */
    fun addTodo(title: String) {
        val todo = TodoListItem(
                id = Date().getTime().toString(),
                title = title,
                completed = false)

        storage.save(todo)

        // Update UI
        view.clearNewTodoInput()
        refreshItems()
    }

    /**
     * Removes a todo item
     */
    fun removeTodo(id: String) {
        storage.remove(id)

        refreshItems()
    }

    /**
     * Toggles a todo item
     * Completed or Uncompleted
     */
    fun toggleTodo(id: String, completed: Boolean) {

        val items = storage.find { it.id == id }

        if(items.isNotEmpty()){
            var item = items[0]
            item.completed = completed
            storage.save(item)
        }

        view.toggleItem(id, completed)
        refreshItems()
    }
}

