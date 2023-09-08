# Deep Dive in React Immutable State

## Description

This project focuses on exploring the concept of immutable objects and classes in the context of React applications. By utilizing technologies such as `useState`, `context`, `use-immer`, and `zustand`, the aim is to gain a better understanding of rendering and re-rendering processes.

One of the challenges addressed in this project is the potential inefficiency caused by re-rendering an entire list instead of just updating a single item. By carefully examining the behaviors of the aforementioned tools, we can mitigate unnecessary re-renders and optimize the performance of our React components.

## Research

# Introduction

Hello folks, happy you reach this guide.

# Motivation

I have working with React a few time, and I have been using void functions to update state, redux toolkit to handle with global state, zustand, and other libraries. But I have never been able to understand how React handle with rerendering inside `Map`, and how to avoid unnecessary rerendering.

I also have been working with React Profile to check the rerender of components, and i notice some weird behavior, like a component that is not being updated, but it is rerendering.

## Observations

1 - To guide us, i will use new Date().getTime() to check the time of the render, and i will use a `Map` to store the components.

2 - Note that i'm not talking about `useMemo` or `useCallback`, i'm talking about the rerendering of components inside `Map`.

Let me give you some examples.

# The Weird Behaviour

## Example 1

Imagine you have a component that receive those properties: `id`, `title`, `price`, `onAdd`, `onRemove`
You can find this in `src/components/test-1/page.tsx`

I started this component using:

```tsx
...
                {cart.map((item) => {
                    const { id, name, quantity } = item
                    return (
                        <li key={id}>
                            <p>{name}</p>
                            <p role="timer">{new Date().getTime()}</p>
                            <button
                                aria-label={`item-${id}-remove`}
                                onClick={() => handleRemoveQuantity(id)}
                            >
                                -1
                            </button>
                            <span>{quantity}</span>
                            <button
                                aria-label={`item-${id}-add`}
                                onClick={() => handleAddQuantity(id)}
                            >
                                +1
                            </button>
                        </li>
                    )
                })}
...
```

This cause a weird behavior, because the component is rerendering every time that the `cart` is updated, even if the component is not being updated.

So to solve this, we can use 3 different approaches together:
1 - Use `React.memo` to avoid unnecessary rerendering.
2 - Use `useCallback` to avoid unnecessary recreation of functions.
3 - Use function binding to avoid unnecessary recreation of functions.

```tsx
.........
 {cart.map((item) => (
    <ListItem
        key={item.id}
        id={item.id}
        name={item.name}
        quantity={item.quantity}
        handleRemoveQuantity={handleRemove} // 3 => function binding
        handleAddQuantity={handleAdd} // 3 => function binding
    />
))}
.........


const ListItem = React.memo( // 1 => React.memo
    ({ id, name, quantity, handleRemoveQuantity, handleAddQuantity }) => {
        return (
            <li key={id}>
                <p>{name}</p>
                <p role="timer">{new Date().getTime()}</p>
                <button
                    aria-label={`item-${id}-remove`}
                    onClick={() => handleRemoveQuantity(id)}
                >
                    -1
                </button>
                <span>{quantity}</span>
                <button
                    aria-label={`item-${id}-add`}
                    onClick={() => handleAddQuantity(id)}
                >
                    +1
                </button>
            </li>
        )
    }
)

...........
// 2 => useCallback
// React work with batch update, so the state will be updated
// that's why i use the prevState to update the state
const handleAddQuantity = React.useCallback((id: number) => {
        setCart((prevState) => {
            const cartCopy = [...prevState];
            const index = cartCopy.findIndex(currentItem => currentItem.id === id)
            cartCopy[index].addQuantity()

            return cartCopy
        })
}, [])

const handleRemoveQuantity = React.useCallback((id: number) => {
setCart((prevState) => {
    const cartCopy = [...prevState];
    const index = cartCopy.findIndex(currentItem => currentItem.id === id)
    cartCopy[index].removeQuantity()

    return cartCopy
})
}, [])
```

Here we have a weird behaviour yet, why ? Because `handleAddQuantity` and `handleRemoveQuantity` are functions, and they are being recreated every time that the component is rerendered.

So to solve this, we can use `useCallback` to avoid unnecessary recreation of functions.

```tsx
export default function Home() {
    const { cart, handleAddQuantity, handleRemoveQuantity } = useCart()

    // If you wont use the useCallback hook, the function will change reference
    // and the ListItem will be re-rendered
    const handleAdd = React.useCallback((id: number) => {
        handleAddQuantity(id)
    }, [])

    // If you wont use the useCallback hook, the function will change reference
    // and the ListItem will be re-rendered
    const handleRemove = React.useCallback((id: number) => {
        handleRemoveQuantity(id)
    }, [])

    return (
        <main>
            <h1>Hook App</h1>
            <ul>
                {cart.map((item) => (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        handleRemoveQuantity={handleRemove}
                        handleAddQuantity={handleAdd}
                    />
                ))}
            </ul>
        </main>
    )
}
```

Something interesting to note is that, if you are storing Classes as Cart Items, it will continue working, because the reference of the function will not change.

# Solving with Zustand

Based on `state/cart.ts`, we can create a state using zustand.

```tsx
handleAddQuantity: (id) => {
        const index = get().cart.findIndex((currentItem) => currentItem.id === id)
        set(
            produce((state: ICartState) => {
                state.cart[index].quantity += 1
            })
        )
    },
// It works without immer, but I'm not sure if it's the best way to do it
handleRemoveQuantity: (id) => {
    const cartCopy = [...get().cart]
    const index = get().cart.findIndex((currentItem) => currentItem.id === id)

    cartCopy[index] = {
        ...cartCopy[index],
        quantity: cartCopy[index].quantity - 1,
    }
    set({ cart: cartCopy })
}
```

and then we can use it in `src/pages/test-3/page.tsx`

```tsx
const cart = useCartState((state) => state.cart)
const handleRemoveQuantity = useCartState((state) => state.handleRemoveQuantity)
const handleAddQuantity = useCartState((state) => state.handleAddQuantity)
```

PS: It's a good practice use selector each selector in a different line, to avoid unnecessary rerendering.

# Solving with Context API

Based on `src/pages/test-4/page.tsx`, i repeat the component just to test if calling function on listItem directly from Context will cause a rerendering. But of course, it will.

Because the context will be updated, and the component will be rerendered.

```tsx
const { cart, handleRemoveQuantity, handleAddQuantity } = useCartContext()
const item = cart.find((item) => item.id === id)
const { name, quantity } = item

return (
    <li key={id}>
        <p>{name}</p>
        <p role="timer">{new Date().getTime()}</p>
        <button
            aria-label={`item-${id}-remove`}
            onClick={() => handleRemoveQuantity(id)}
        >
            -1
        </button>
        <span>{quantity}</span>
        <button
            aria-label={`item-${id}-add`}
            onClick={() => handleAddQuantity(id)}
        >
            +1
        </button>
    </li>
)
```

# Conclusion

So, what's the best way to do it ?

Each approach has its pros and cons, you can use the one that fits better for your use case.

1 - You can use use-context-selector by dai-shi
2 - You can use Zustand
3 - You can use Context API
4 - You can use Redux

etc...

SO be careful, and always use the React DevTools to check if your component is being rerendered unnecessarily. And if it is, try to solve it.

You should also be careful with handleChange ( inputs updates ) functions, because they can cause unnecessary rerendering too.

## Technologies Used

-   React: A JavaScript library for building user interfaces.
-   `useState`: A React hook used for managing state within functional components.
-   `context`: A feature in React that provides a way to share data between components without explicitly passing it through props.
-   `use-immer`: A custom hook that simplifies working with immutable state by leveraging the Immer library.
-   `zustand`: A small, fast state management library for React that provides a simple and flexible API.

## Goals

The main goals of this project are:

1. Gain a deeper understanding of immutable objects and classes.
2. Explore the behavior of React's `useState` hook and its impact on rendering and re-rendering.
3. Understand the usage of `context` in managing shared data between components.
4. Evaluate the benefits of using `use-immer` for working with immutable state.
5. Investigate the capabilities of `zustand` as an alternative state management solution.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository
2. Navigate to the project directory: `cd react-immutable-state`
3. Install the dependencies: `npm install` or `yarn install`

## Usage

To start the development server and run the project, use the following command:

```shell
npm start
```

or

```shell
yarn start
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
