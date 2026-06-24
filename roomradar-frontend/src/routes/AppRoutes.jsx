import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";

import ProfileSetup from "../pages/ProfileSetup";
import Matches from "../pages/Matches";
import Requests from "../pages/Requests";
import Connections from "../pages/Connections";
import Chat from "../pages/Chat";
import Reputation
  from "../pages/Reputation";
import LeaveReview
  from "../pages/LeaveReview";

import SentRequests
  from "../pages/SentRequests";

import AppLayout from "../layouts/AppLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

       <Route
  path="/profile/setup"
  element={
    <ProtectedRoute>
      <AppLayout>
        <ProfileSetup />
      </AppLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/matches"
  element={
    <ProtectedRoute>
      <AppLayout>
        <Matches />
      </AppLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/requests"
  element={
    <ProtectedRoute>
      <AppLayout>
        <Requests />
      </AppLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/connections"
  element={
    <ProtectedRoute>
      <AppLayout>
        <Connections />
      </AppLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/chat"
  element={
    <ProtectedRoute>
      <AppLayout>
        <Chat />
      </AppLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/sent"
  element={
    <ProtectedRoute>
      <AppLayout>
        <SentRequests />
      </AppLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/reputation/:userId"
  element={
    <ProtectedRoute>
      <AppLayout>
        <Reputation />
      </AppLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/reviews/:revieweeId/:connectionId"
  element={
    <ProtectedRoute>
      <AppLayout>
        <LeaveReview />
      </AppLayout>
    </ProtectedRoute>
  }
/>

        {/* Default Route */}

        <Route
          path="/"
          element={
            <Navigate
              to="/matches"
              replace
            />
          }
        />

        {/* 404 Route */}

        <Route
          path="*"
          element={
            <h1 className="text-center text-3xl mt-20">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;