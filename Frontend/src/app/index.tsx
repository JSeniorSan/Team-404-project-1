import { Routing } from "../pages/index";
import "./index.scss";
import { withProviders } from "./providers";
const App = () => <Routing />;
const AppWithPrivider = withProviders(App);
export default AppWithPrivider;
