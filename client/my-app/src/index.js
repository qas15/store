import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client'; // Новый импорт для React 18
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            device: new DeviceStore(),
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
);

