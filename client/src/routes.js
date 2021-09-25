import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage';
import {ProfilePage} from "./pages/ProfilePage";
import CommonAnalysisPage from "./pages/CommonAnalysisPage";
import {SettingsPage} from "./pages/SettingsPage";
import {ActionsPage} from "./pages/ActionsPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile/:id">
                    <ProfilePage />
                </Route>
                <Route path="/common" exact>
                    <CommonAnalysisPage />
                </Route>
                <Route path="/settings" exact>
                    <SettingsPage />
                </Route>
                <Route path="/actions" exact>
                    <ActionsPage />
                </Route>
                <Redirect to="/common"/>
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