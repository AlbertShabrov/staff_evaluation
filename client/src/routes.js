import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage';
import {ProfilePage} from "./pages/ProfilePage";
import AnalysisPage from "./pages/AnalysisPage";
import {SettingsPage} from "./pages/SettingsPage";
import {ActionsPage} from "./pages/ActionsPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile/:id">
                    <ProfilePage />
                </Route>
                <Route path="/analysis" exact>
                    <AnalysisPage />
                </Route>
                <Route path="/settings" exact>
                    <SettingsPage />
                </Route>
                <Route path="/actions" exact>
                    <ActionsPage />
                </Route>
                <Redirect to="/analysis"/>
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};
