export default function welcome() {
  return (
    <div className="text-2xl md:text-3xl lg:text-5xl text-zinc-400  text-center">
      <h1 className="font-semibold">
        Welcome to <span className="text-white">Stock</span> App
      </h1>
      <div className="mainAnimation">
        <div className="circleAnimation"></div>
        <div className="circleAnimation2"></div>
        <div className="circleAnimation3"></div>
      </div>
    </div>
  );
}
