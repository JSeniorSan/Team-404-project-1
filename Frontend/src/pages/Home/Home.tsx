import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-5xl font-bold gap-3 ">
      Hello
      <div className="transition-all text-2xl">Давай перейдем к задачам!😁</div>
      <div className="flex gap-3">
        <button className="border rounded-md bg-slate-200 p-2 flex items-center">
          <Link to={"/dashboard/todos/list"}>Go to dashboard!🌱</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
