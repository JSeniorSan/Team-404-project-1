import "./index.scss";
import { Routing } from "../pages/index";
import { withProviders } from "./providers";
const App = () => <Routing />;
const AppWithPrivider = withProviders(App);
export default AppWithPrivider;
