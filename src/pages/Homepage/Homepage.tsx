import React from "react";
import NewReleases from './components/NewReleases';
import Albumes from "./components/Albums";
import Tracks from "./components/Tracks";

const HomePage: React.FC = () => {
    return(
        <div>
            <NewReleases />
            <Tracks />
            <Albumes />
        </div>
    )
}

export default HomePage;