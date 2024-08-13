export default function Login() {
  return (
    <div className="login-container w-screen m-0 h-screen flex items-center justify-center bg-gray-300">
      <div className="form-container sm:w-[40%] w-3/4 bg-white h-fit rounded-lg flex flex-col items-center ">
        <h2 className="my-4 text-xl text-mainBlue">ورود به پنل ادمین</h2>
        <img
          src="../public/logo/IranSigLOGO.svg"
          alt="logo"
          className="w-20 h-20"
        />
        <form action="submit" className="flex flex-col w-full items-center ">
          <label htmlFor="emailInput" className="block w-[70%] text-right">
            ایمیل
          </label>
          <input
            name="emailInput"
            type="text"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm text-left px-2"
          />
          <label htmlFor="passInput" className="block w-[70%] text-right">
            رمز عبور
          </label>
          <input
            name="passInput"
            type="password"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm text-left px-2"
          />
          <button className="w-fit py-1 px-6 bg-mainBlue rounded flex items-center text-white my-8">
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
