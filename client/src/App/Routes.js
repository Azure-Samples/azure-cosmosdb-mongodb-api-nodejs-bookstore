import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BookPage } from '../Book';
import { BooksListPage } from '../Home';

const routes = [ {
    path: '/',
    Component: BooksListPage,
    private: true,
    exact: true,
}, {
    path: '/book/:id',
    Component: BookPage,
    private: true,
}
];

export const Routes = (props) => (
    <Router>
        <Switch>
        {routes.map((route, index) => (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
            >
                <route.Component rating={props.rating} format={props.format} genre={props.genre} searchText={props.searchText}/>
            </Route>
        ))}
        </Switch>
    </Router>
)