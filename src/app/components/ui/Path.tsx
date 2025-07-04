const Path = ({ direction }: { direction: Direction }) => {
  const config = {
    orientaion: "0",
    colour: "#FF0000", // red
    starColour: "#0000FF", // blue
  };
  if (direction === Direction.Up) {
    config.orientaion = "0";
    config.colour = "#008000"; // green
    config.starColour = "#FF0000"; // red
  }
  if (direction === Direction.Right) {
    config.orientaion = "180";
    config.colour = "#FDDA0D"; // yellow
    config.starColour = "#008000"; // green
  }
  if (direction === Direction.Down) {
    config.orientaion = "180";
    config.colour = "#0000FF"; // blue
    config.starColour = "#FDDA0D"; // yellow
  }

  if (direction === Direction.Left || direction === Direction.Right) {
    return (
      <div style={{ transform: `rotate(${config.orientaion}deg)` }}>
        <div className={`inline-grid grid-cols-6 `}>
          {Array.from({ length: 18 }).map((_, i) => (
            <Cell2
              key={i}
              num={i}
              colour={config.colour}
              starColour={config.starColour}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ transform: `rotate(${config.orientaion}deg)` }}>
      <div className={`inline-grid grid-cols-3 `}>
        {Array.from({ length: 18 }).map((_, i) => (
          <Cell1
            key={i}
            num={i}
            colour={config.colour}
            starColour={config.starColour}
          />
        ))}
      </div>
    </div>
  );
};

export default Path;

const Cell1 = ({
  num,
  colour,
  starColour,
}: {
  num: number;
  colour: string;
  starColour: string;
}) => {
  let bgColor = "white";
  if ([4, 5, 7, 10, 13, 16].includes(num)) {
    bgColor = colour;
  }
  return (
    <div
      className={`w-[40px] h-[40px] border border-gray-300  flex justify-center items-center `}
      style={{ backgroundColor: bgColor }}
    >
      {num === 1 ? (
        <svg
          className="w-[30px] h-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
        >
          <title>Artboard-34</title>
          <g id="Right-2" data-name="Right">
            <polygon
              points="17.5 5.999 16.793 6.706 22.086 11.999 1 11.999 1 12.999 22.086 12.999 16.792 18.294 17.499 19.001 24 12.499 17.5 5.999"
              style={{ fill: colour }}
            />
          </g>
        </svg>
      ) : num === 6 ? (
        <svg
          className="w-[30px] h-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          width={800}
          height={800}
          viewBox="0 -0.5 33 33"
        >
          <title>{"star"}</title>
          <path
            fill={starColour}
            fillRule="evenodd"
            d="m26.865 31.83-10.25-5.621-10.153 5.8 2.091-11.647-8.563-8.027 11.542-1.577L16.394 0l5.042 10.672L33 12.047l-8.426 8.173z"
          />
        </svg>
      ) : null}
    </div>
  );
};

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const Cell2 = ({
  num,
  colour,
  starColour,
}: {
  num: number;
  colour: string;
  starColour: string;
}) => {
  let bgColor = "white";
  if ([1, 7, 8, 9, 10, 11].includes(num)) {
    bgColor = colour;
  }
  return (
    <div
      className={`w-[40px] h-[40px] border border-gray-300  flex justify-center items-center `}
      style={{ backgroundColor: bgColor }}
    >
      {num === 6 ? (
        <svg
          className="w-[30px] h-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
        >
          <title>Artboard-34</title>
          <g id="Right-2" data-name="Right">
            <polygon
              points="17.5 5.999 16.793 6.706 22.086 11.999 1 11.999 1 12.999 22.086 12.999 16.792 18.294 17.499 19.001 24 12.499 17.5 5.999"
              style={{ fill: colour }}
            />
          </g>
        </svg>
      ) : num === 14 ? (
        <svg
          className="w-[30px] h-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          width={800}
          height={800}
          viewBox="0 -0.5 33 33"
        >
          <title>{"star"}</title>
          <path
            fill={starColour}
            fillRule="evenodd"
            d="m26.865 31.83-10.25-5.621-10.153 5.8 2.091-11.647-8.563-8.027 11.542-1.577L16.394 0l5.042 10.672L33 12.047l-8.426 8.173z"
          />
        </svg>
      ) : null}
    </div>
  );
};
