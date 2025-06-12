import { Fragment } from "react/jsx-runtime";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoListWrapper from "./components/TodoListWrapper";

export const themes = ["light", "dark", "sky"];

export default function App() {
    return (
        <Fragment>
            <Header />
            <TodoListWrapper />
            <Footer />
        </Fragment>
    );
}
