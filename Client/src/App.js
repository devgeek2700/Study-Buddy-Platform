import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Homepage";
import Groups from "./Groups";
import GroupDetailspage from "./GroupDetailspage";
import JoinMeet from "./JoinMeet";
import JoinChat from "./JoinChat";
import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";
import ShareNotes from "./ShareNotes";
import UserProfile from "./UserProfile";
import CreateNotes from "./CreateNotes";
import Tests from "./Tests";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Homepage />),
  },
  {
    path: "/Groups",
    element: (<Groups />),
  },
  {
    path: "/GroupDetailspage/:id",
    element: (<GroupDetailspage />),
  },
  {
    path: "/JoinMeet/:id",
    element: (<JoinMeet />),
  },
  {
    path: "/JoinChat",
    element: (<JoinChat />),
  },
  {
    path: "/AuthPage",
    element: (<AuthPage />),
  },
  {
    path: "/ChatsPage",
    element: (<ChatsPage />),
  },
  {
    path: "/ShareNotes",
    element: (<ShareNotes />),
  },
  {
    path: "/UserProfile",
    element: (<UserProfile />),
  },
  {
    path: "/CreateNotes",
    element: (<CreateNotes />),
  },
  {
    path: "/Tests/:id",
    element: (<Tests />),
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
