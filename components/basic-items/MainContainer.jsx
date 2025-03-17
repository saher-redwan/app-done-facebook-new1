import Link from "next/link";
import MainLinksMenu from "./MainLinksMenu";
export default function MainContainer({ children }) {
  const widthOfMainLinks = {
    start: "w-[225px]",
    maxL: "xl:w-[325px]",
  };

  return (
    <div className="">
      <div className="flex gap-[2rem] xl:gap-[5.5rem] justify-around lg:justify-between">
        {/* <div className="hidden lg:block w-[225px]"> */}
        <div
          className={`hidden lg:block ${widthOfMainLinks?.start} ${widthOfMainLinks?.maxL}`}
        >
          <MainLinksMenu widthOfMainLinks={widthOfMainLinks} />
        </div>
        <div className="flex-1 max-w-[550px]">{children}</div>
        {/* ads */}
        <div className="w-[205px] lg:w-[300px] hidden md:block">
          <div className="fixed">
            <div className="mt-4 mx-4">
              <Link href="">
                <img
                  src="https://m.media-amazon.com/images/I/A1-LgsoZS0L.png"
                  alt=""
                  className="w-full h-[9.5rem]"
                />

                <p className="text-[0.8775rem] mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  beatae neque dolor nostrum ad excepturi accusantium repellat
                  ab nisi, eveniet, perspiciatis inventore quibusdam quos,
                  provident soluta iste eaque nesciunt.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
