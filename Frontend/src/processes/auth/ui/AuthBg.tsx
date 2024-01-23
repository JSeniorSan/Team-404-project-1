const AuthBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-600 ">
      <div className="bg-blue-300 absolute top-16 right-5 rounded-full w-20 h-20 animate-[bounce_3s_infinite]"></div>
      <div className="bg-green-300 absolute top-96 right-28 rounded-full w-40 h-40 animate-[bounce_2s_infinite] "></div>
      <div className="bg-yellow-300 hidden absolute md:block top-56 left-96 rounded-full w-[300px] h-[200px] -rotate-45"></div>
      <div className="bg-pink-300 opacity-80  absolute top-[700px] left-24 rounded-full w-32 h-32 animate-[bounce_4s_infinite] "></div>
      {children}
    </div>
  );
};

export default AuthBg;
