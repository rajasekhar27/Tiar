import { TbCricket } from "react-icons/tb";
import { MdSportsKabaddi, MdSportsHandball } from "react-icons/md";
import { IoFootballOutline, IoBaseballOutline } from "react-icons/io5";
import { FaVolleyballBall } from "react-icons/fa";

export const games = [
  {
    id: 1,
    name: "Cricket",
    icon: <TbCricket size={20} />,
    iconHighlight: <TbCricket size={20} color={"#F36341"} />,
    isImg: false,
  },
  {
    id: 2,
    name: "Kabbadi",
    icon: <MdSportsKabaddi size={20} />,
    iconHighlight: <MdSportsKabaddi size={20} color={"#F36341"} />,

    isImg: false,
  },
  {
    id: 3,
    name: "Football",
    icon: <IoFootballOutline size={20} />,
    iconHighlight: <IoFootballOutline size={20} color={"#F36341"} />,

    isImg: false,
  },
  {
    id: 4,
    name: "Handball",
    icon: <MdSportsHandball size={20} />,
    iconHighlight: <MdSportsHandball size={20} color={"#F36341"} />,

    isImg: false,
  },
  {
    id: 5,
    name: "Volleyball",
    icon: <FaVolleyballBall size={20} />,
    iconHighlight: <FaVolleyballBall size={20} color={"#F36341"} />,
    isImg: false,
  },
  {
    id: 5,
    name: "Baseball",
    icon: <IoBaseballOutline size={20} />,
    iconHighlight: <IoBaseballOutline size={20} color={"#F36341"} />,
    isImg: false,
  },
];

export const globalConfig = {
  headingsSize: "text-[18px]",
  descriptionSize: "text-[14px]",
  primaryBackgroundColor: "bg-ownOrange",
  primaryBorder: "border-ownOrange",
  primaryTextColor: "text-ownOrange",
  secondaryBackgroundColor: "bg-white",
  secondaryTextColor: "bg-white",
};

/**
 * * Cricket Config *
 */
export const cricketConfig = {
  banner: "/images/banner_1.png",
  highlightColor: "bg-ownOrange text-white",
  pointTableColors: {
    primary: "#F97F4E",
    secondary: "#128807",
  },
};

// ** create your team
export const createTeamConfig = {
  video1: "https://youtu.be/qZVTkn2NjS0",
  img1: "/images/banner_17.png",
  img2: "/images/banner_10.png",
  img3: "/images/banner_10.png",
};

// ** Fantasy Points
// ** T20
export const t20FantasyPoints = {
  additionalInfo: null,
  dropDown: [
    {
      id: 1,
      dropDownName: "Batting Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Run",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Boundary Bonus",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Six Bonus",
          subTitle: "",
          points: "+2",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "30 Run Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Half - Century Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Century Bonus",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
        {
          id: 7,
          name: "Dismissal of a duck",
          subTitle: "Batter, wicket-Keeper & All Rounder",
          points: "-2",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Any player scoring a century will only get points for the century. No points will be awarded as their 30 run Bonus or Half-century Bonus. Additionally, no points are awarded for centuries in T10 matches.",
        },
        {
          id: 2,
          description:
            "If any runs are scored on an overthrow, points for those runs will be credited to the batter on strike for that ball. However, if the overthrow goes for a boundary, the batter will not receive extra Boundary Bonus points.",
        },
      ],
    },
    {
      id: 2,
      dropDownName: "Bowling Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Wicket",
          subTitle: "Excluding Run Out",
          points: "+25",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Bonus ( LBW / Bowled )",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "3 wicket Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "4 Wicket Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "5 Wicket Bonus",
          subTitle: "",

          points: "+16",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Maid Over",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 3,
      dropDownName: "Fielding Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Catch",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "3 Catch Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Stumping",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Run out ( Direct hit )",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Run out ( Not Direct hit )",
          subTitle: "",

          points: "+6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "A direct hit is inflicted by the fielder who is the only one to touch the ball after the batter faces the delivery. In all other cases, points will be awarded only to the last 2 fielders who touch the ball.",
        },
        {
          id: 2,
          description:
            "Players taking more than 3 catches will also get 4 points as 3 Catch Bonus. For example, if a player takes 6 catches, he/she will not get 8 points.",
        },
      ],
    },
    {
      id: 4,
      dropDownName: "Other Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Captain",
          subTitle: "",
          points: "2X",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Vice - Captain",
          subTitle: "",
          points: "1.5X",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "In Announced lineup",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Playing Substitutes",
          subTitle: "( concussion , COVID-19,X-Factor , or , impact player )",
          points: "+4",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 5,
      dropDownName: "Economy Rate Points",
      dropDownSubtitle: "Min 2 Overs to be Bowled",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Below 5 runs per over",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 5-5 , 99 runs per over",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },

        {
          id: 3,
          name: "Between 6-7 , runs per over",
          subTitle: "",
          points: "+2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 10-11 , runs per over",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 11.01-12 , runs per over",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Below 12 runs per over",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 6,
      dropDownName: "Strike Raise (Excet Bowel)Points",
      dropDownSubtitle: "Min 10 Balls to bePlayed",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Above 170 runs per 100 balls",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 150 , 01 -170 runs per 100 balls",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },
        {
          id: 3,
          name: "Between 130 - 150 runs per 100 balls",
          subTitle: "",
          points: "+2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 60 - 70 runs per 100 balls",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 50-59 , 99 runs per 100 balls",
          subTitle: "",

          points: "+16",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Between 50 runs per 10 balls",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Negative points for low batting Strike Rates are only applicable for individual Strike Rates of 70 runs per 100 balls or below.",
        },
      ],
    },
  ],
};

// ** OD
export const odFantasyPoints = {
  additionalInfo: null,
  dropDown: [
    {
      id: 1,
      dropDownName: "Batting Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Run",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Boundary Bonus",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Six Bonus",
          subTitle: "",
          points: "+2",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Half - Century Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Century Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Dismissal for a duck",
          subTitle: "Batter, wicket-Keeper & All Rounder",
          points: "-3",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Any player scoring a century will only get points for the century. No points will be awarded their Half-century.Additionally, no points are awarded for centuries in T10 matches.",
        },
        {
          id: 2,
          description:
            "If any runs are scored on an overthrow, points for those runs will be credited to the batter on strike for that ball. However, if the overthrow goes for a boundary, the batter will not receive extra Boundary Bonus points.",
        },
      ],
    },
    {
      id: 2,
      dropDownName: "Bowling Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Wicket",
          subTitle: "Excluding Run Out",
          points: "+25",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Bonus ( LBW / Bowled )",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "4 wicket Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "5 Wicket Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Maid Over",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 3,
      dropDownName: "Fielding Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Catch",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "3 Catch Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Stumping",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Run out ( Direct hit )",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Run out ( Not Direct hit )",
          subTitle: "",

          points: "+6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "A direct hit is inflicted by the fielder who is the only one to touch the ball after the batter faces the delivery. In all other cases, points will be awarded only to the last 2 fielders who touch the ball.",
        },
        {
          id: 2,
          description:
            "Players taking more than 3 catches will also get 4 points as 3 Catch Bonus. For example, if a player takes 6 catches, he/she will not get 8 points.",
        },
      ],
    },
    {
      id: 4,
      dropDownName: "Other Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Captain",
          subTitle: "",
          points: "2X",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Vice - Captain",
          subTitle: "",
          points: "1.5X",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "In Announced lineup",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Playing Substitutes",
          subTitle: "( concussion , COVID-19,X-Factor , or , impact player )",

          points: "+4",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 5,
      dropDownName: "Economy Rate Points",
      dropDownSubtitle: "Min 5 Overs to be Bowled",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Below 2.5 runs per over",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 2.5 - 3.49 runs per over",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },

        {
          id: 3,
          name: "Between 3.5 - 4.5 runs per over",
          subTitle: "",
          points: "+2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 7 - 8 runs per over",
          subTitle: "",
          points: "-2",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 8.01 - 9 runs per over",
          subTitle: "",
          points: "-4",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Above 9 runs per over",
          subTitle: "",
          points: "-6",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 6,
      dropDownName: "Strike Raise (Except Bowler)Points",
      dropDownSubtitle: "Min 20 Balls To Be Played",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Above 140 runs per 100 balls",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 120.01 - 140 runs per 100 balls",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },
        {
          id: 3,
          name: "Between 100 - 120 runs per 100 balls",
          subTitle: "",
          points: "+2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 40 - 50 runs per 100 balls",
          subTitle: "",
          points: "-2",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 30 - 39.99 runs per 100 balls",
          subTitle: "",

          points: "-4",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Between 30 runs per 100 balls",
          subTitle: "",
          points: "-6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Negative points for low batting Strike Rates are only applicable for individual Strike Rates of 50 runs per 100 balls or below.",
        },
      ],
    },
  ],
};

// ** Test
export const testFantasyPoints = {
  additionalInfo: null,
  dropDown: [
    {
      id: 1,
      dropDownName: "Batting Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Run",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Boundary Bonus",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Six Bonus",
          subTitle: "",
          points: "+2",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Half - Century Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Century Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Dismissal for a duck",
          subTitle: "Batter, Wicket-Keeper & All-Rounder",
          points: "-4",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Any player scoring a century will only get points for the century. No points will be awarded for their half-century.Additionally, no points are awarded for centuries in T10 matches.",
        },
        {
          id: 2,
          description:
            "If any runs are scored on an overthrow, points for those runs will be credited to the batter on strike for that ball. However, if the overthrow goes for a boundary, the batter will not receive extra Boundary Bonus points.",
        },
      ],
    },
    {
      id: 2,
      dropDownName: "Bowling Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Wicket",
          subTitle: "Excluding Run Out",
          points: "+16",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Bonus ( LBW / Bowled )",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "4 wicket Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "5 Wicket Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 3,
      dropDownName: "Fielding Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Catch",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Stumping",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Run out ( Direct hit )",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Run out ( Not Direct hit )",
          subTitle: "",

          points: "+6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "A direct hit is inflicted by the fielder who is the only one to touch the ball after the batter faces the delivery. In all other cases, points will be awarded only to the last 2 fielders who touch the ball.",
        },
      ],
    },
    {
      id: 4,
      dropDownName: "Other Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Captain",
          subTitle: "",
          points: "2X",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Vice-Captain",
          subTitle: "",
          points: "1.5X",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "In Announced lineups",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Playing Substitutes",
          subTitle: "( concussion , COVID-19,X-Factor , or , impact player )",

          points: "+4",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
  ],
};

// ** T10
export const t10FantasyPoints = {
  additionalInfo: null,
  dropDown: [
    {
      id: 1,
      dropDownName: "Batting Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Run",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Boundary Bonus",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Six Bonus",
          subTitle: "",
          points: "+2",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "30 Run Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "50 Run Bonus",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Dismissal for a duck",
          subTitle: "Batter, wicket-Keeper & All Rounder",
          points: "-2",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Any player scoring a century will only get points for the century. No points will be awarded their Half-century.Additionally, no points are awarded for centuries in T10 matches.",
        },
        {
          id: 2,
          description:
            "If any runs are scored on an overthrow, points for those runs will be credited to the batter on strike for that ball. However, if the overthrow goes for a boundary, the batter will not receive extra Boundary Bonus points.",
        },
      ],
    },
    {
      id: 2,
      dropDownName: "Bowling Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Wicket",
          subTitle: "Excluding Run Out",
          points: "+25",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Bonus ( LBW / Bowled )",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "2 wicket Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "3 Wicket Bonus",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Maid Over",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 3,
      dropDownName: "Fielding Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Catch",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "3 Catch Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Stumping",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Run out ( Direct hit )",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Run out ( Not Direct hit )",
          subTitle: "",

          points: "+6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "A direct hit is inflicted by the fielder who is the only one to touch the ball after the batter faces the delivery. In all other cases, points will be awarded only to the last 2 fielders who touch the ball.",
        },
        {
          id: 2,
          description:
            "Players taking more than 3 catches will also get 4 points as 3 Catch Bonus. For example, if a player takes 6 catches, he/she will not get 8 points.",
        },
      ],
    },
    {
      id: 4,
      dropDownName: "Other Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Captain",
          subTitle: "",
          points: "2X",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Vice-Captain",
          subTitle: "",
          points: "1.5X",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "In Announced lineups",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Playing Substitutes",
          subTitle: "( Concussion , COVID-19,X-Factor , or , impact player )",

          points: "+4",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 5,
      dropDownName: "Economy Rate Points",
      dropDownSubtitle: "Min 1 Over",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Below 7 runs per over",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 7 - 7.99 runs per over",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },

        {
          id: 3,
          name: "Between 8 - 9 runs per over",
          subTitle: "",
          points: "+2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 14 - 15 runs per over",
          subTitle: "",
          points: "-2",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 15.01 - 16 runs per over",
          subTitle: "",
          points: "-4",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Above 16 runs per over",
          subTitle: "",
          points: "-6",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 6,
      dropDownName: "Strike Rate (Except Bowler) Points",
      dropDownSubtitle: "Min 5 Balls",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Over 190 runs per 100 balls",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 170.01 - 190 runs per 100 balls",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },
        {
          id: 3,
          name: "Between 150 - 170 runs per 100 balls",
          subTitle: "",
          points: "2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 70 - 80 runs per 100 balls",
          subTitle: "",
          points: "-2",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 60 - 69.99 runs per 100 balls",
          subTitle: "",

          points: "-4",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Between 60 runs per 100 balls",
          subTitle: "",
          points: "-6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Negative points for low batting Strike Rates are only applicable for individual Strike Rates of 80 runs per 100 balls or below.",
        },
      ],
    },
  ],
};

// ** 6ixty
export const sixtyFantasyPoints = {
  additionalInfo: {
    title: "Important",
    info: [
      {
        id: 1,
        desc: "Instead of 10 Wickets, a team gets all out when they lose 6 wickets.",
      },
      {
        id: 2,
        desc: "A bonus batting power play over if batsmen hit 2 sixes in the first 2 overs.",
      },
      {
        id: 3,
        desc: "Bowlers bowl the first 5 overs from the same end.",
      },
    ],
  },

  dropDown: [
    {
      id: 1,
      dropDownName: "Batting Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Run",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Boundary Bonus",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Six Bonus",
          subTitle: "",
          points: "+2",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "30 Run Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "50 Run Bonus",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Dismissal for a duck",
          subTitle: "Batter, wicket-Keeper & All Rounder",
          points: "-2",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Any player scoring a century will only get points for the century. No points will be awarded their Half-century.Additionally, no points are awarded for centuries in T10 matches.",
        },
        {
          id: 2,
          description:
            "If any runs are scored on an overthrow, points for those runs will be credited to the batter on strike for that ball. However, if the overthrow goes for a boundary, the batter will not receive extra Boundary Bonus points.",
        },
      ],
    },
    {
      id: 2,
      dropDownName: "Bowling Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Wicket",
          subTitle: "Excluding Run Out",
          points: "+25",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Bonus ( LBW / Bowled )",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "2 wicket Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "3 Wicket Bonus",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Maid Over",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 3,
      dropDownName: "Fielding Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Catch",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "3 Catch Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Stumping",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Run out ( Direct hit )",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Run out ( Not Direct hit )",
          subTitle: "",

          points: "+6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "A direct hit is inflicted by the fielder who is the only one to touch the ball after the batter faces the delivery. In all other cases, points will be awarded only to the last 2 fielders who touch the ball.",
        },
        {
          id: 2,
          description:
            "Players taking more than 3 catches will also get 4 points as 3 Catch Bonus. For example, if a player takes 6 catches, he/she will not get 8 points.",
        },
      ],
    },
    {
      id: 4,
      dropDownName: "Other Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Captain",
          subTitle: "",
          points: "2X",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Vice-Captain",
          subTitle: "",
          points: "1.5X",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "In Announced lineups",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Playing Substitutes",
          subTitle: "( Concussion , COVID-19,X-Factor , or , impact player )",

          points: "+4",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 5,
      dropDownName: "Economy Rate Points",
      dropDownSubtitle: "Min 1 Over",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Below 7 runs per over",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 7 - 7.99 runs per over",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },

        {
          id: 3,
          name: "Between 8 - 9 runs per over",
          subTitle: "",
          points: "+2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 14 - 15 runs per over",
          subTitle: "",
          points: "-2",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 15.01 - 16 runs per over",
          subTitle: "",
          points: "-4",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Above 16 runs per over",
          subTitle: "",
          points: "-6",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 6,
      dropDownName: "Strike Rate (Except Bowler) Points",
      dropDownSubtitle: "Min 5 Balls",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Over 190 runs per 100 balls",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 170.01 - 190 runs per 100 balls",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },
        {
          id: 3,
          name: "Between 150 - 170 runs per 100 balls",
          subTitle: "",
          points: "2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 70 - 80 runs per 100 balls",
          subTitle: "",
          points: "-2",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 60 - 69.99 runs per 100 balls",
          subTitle: "",

          points: "-4",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Between 60 runs per 100 balls",
          subTitle: "",
          points: "-6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Negative points for low batting Strike Rates are only applicable for individual Strike Rates of 80 runs per 100 balls or below.",
        },
      ],
    },
  ],
};

// ** The Hundred
export const theHundredFantasyPoints = {
  additionalInfo: null,
  dropDown: [
    {
      id: 1,
      dropDownName: "Batting Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Run",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Boundary Bonus",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Six Bonus",
          subTitle: "",
          points: "+2",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "30 Run Bonus",
          subTitle: "",
          points: "+5",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Half-century Bonus",
          subTitle: "",
          points: "+10",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Century Bonus",
          subTitle: "",
          points: "+20",
          secondaryColor: false,
        },
        {
          id: 7,
          name: "Dismissal for a duck",
          subTitle: "Batter, wicket-Keeper & All Rounder",
          points: "-2",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Any player scoring a century will only get points for the century. No points will be awarded their 30 run Bonus or Half-century Bonus.",
        },
        {
          id: 2,
          description:
            "If any runs are scored on an overthrow, points for those runs will be credited to the batter on strike for that ball. However, if the overthrow goes for a boundary, the batter will not receive extra Boundary Bonus points.",
        },
      ],
    },
    {
      id: 2,
      dropDownName: "Bowling Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Wicket",
          subTitle: "Excluding Run Out",
          points: "+25",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Bonus ( LBW / Bowled )",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "2 wicket Bonus",
          subTitle: "",
          points: "+3",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "3 Wicket Bonus",
          subTitle: "",
          points: "+5",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "4 Wicket Bonus",
          subTitle: "",
          points: "+10",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "5 Wicket Bonus",
          subTitle: "",
          points: "+20",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 3,
      dropDownName: "Fielding Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Catch",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "3 Catch Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Stumping",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Run out ( Direct hit )",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Run out ( Not Direct hit )",
          subTitle: "",

          points: "+6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "A direct hit is inflicted by the fielder who is the only one to touch the ball after the batter faces the delivery. In all other cases, points will be awarded only to the last 2 fielders who touch the ball.",
        },
        {
          id: 2,
          description:
            "Players taking more than 3 catches will also get 4 points as 3 Catch Bonus. For example, if a player takes 6 catches, he/she will not get 8 points.",
        },
      ],
    },
    {
      id: 4,
      dropDownName: "Other Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Captain",
          subTitle: "",
          points: "2X",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Vice-Captain",
          subTitle: "",
          points: "1.5X",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "In Announced lineups",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Playing Substitutes",
          subTitle: "( Concussion , COVID-19,X-Factor , or , impact player )",

          points: "+4",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
  ],
};

// ** Other T20
export const otherT20FantasyPoints = {
  additionalInfo: null,
  dropDown: [
    {
      id: 1,
      dropDownName: "Batting Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Run",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Boundary Bonus",
          subTitle: "",
          points: "+1",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Six Bonus",
          subTitle: "",
          points: "+2",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "30 Run Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Half-century Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Century Bonus",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
        {
          id: 7,
          name: "Dismissal for a duck",
          subTitle: "Batter, wicket-Keeper & All Rounder",
          points: "-2",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Any player scoring a century will only get points for the century. No points will be awarded as their 30 run Bonus or Half-century Bonus.Additionally, no points are awarded for centuries in T10 matches.",
        },
        {
          id: 2,
          description:
            "If any runs are scored on an overthrow, points for those runs will be credited to the batter on strike for that ball. However, if the overthrow goes for a boundary, the batter will not receive extra Boundary Bonus points.",
        },
      ],
    },
    {
      id: 2,
      dropDownName: "Bowling Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Wicket",
          subTitle: "Excluding Run Out",
          points: "+25",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Bonus ( LBW / Bowled )",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "3 wicket Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "4 Wicket Bonus",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "5 Wicket Bonus",
          subTitle: "",
          points: "+16",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Maid Over",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 3,
      dropDownName: "Fielding Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Catch",
          subTitle: "",
          points: "+8",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "3 Catch Bonus",
          subTitle: "",
          points: "+4",
          secondaryColor: false,
        },
        {
          id: 3,
          name: "Stumping",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 4,
          name: "Run out ( Direct hit )",
          subTitle: "",
          points: "+12",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Run out ( Not Direct hit )",
          subTitle: "",

          points: "+6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "A direct hit is inflicted by the fielder who is the only one to touch the ball after the batter faces the delivery. In all other cases, points will be awarded only to the last 2 fielders who touch the ball.",
        },
        {
          id: 2,
          description:
            "Players taking more than 3 catches will also get 4 points as 3 Catch Bonus. For example, if a player takes 6 catches, he/she will not get 8 points.",
        },
      ],
    },
    {
      id: 4,
      dropDownName: "Other Points",
      dropDownSubtitle: "",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Captain",
          subTitle: "",
          points: "2X",
          secondaryColor: false,
        },
        {
          id: 2,
          name: "Vice-Captain",
          subTitle: "",
          points: "1.5X",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "If a player plays for both teams, points will only be awarded for the player's on-field performance for the team where the player was available for selection",
        },
        {
          id: 2,
          description:
            "If a player is dismissed and comes to bat again in the same innings, points will be awarded for as many on-field performance contributions the player has made in that innings",
        },
        {
          id: 3,
          description:
            "If a player comes to bat/field/bowl for the opposite team (where the player was not available for selection), no points will be awarded for as many contributions the player has made for the opposite team.",
        },
      ],
    },
    {
      id: 5,
      dropDownName: "Economy Rate Points",
      dropDownSubtitle: "Min 2 Overs To Be Bowled",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Below 5 runs per over",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 5 - 5.99 runs per over",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },

        {
          id: 3,
          name: "Between 6 - 7 runs per over",
          subTitle: "",
          points: "+2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 10 - 11 runs per over",
          subTitle: "",
          points: "-2",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 11.01 - 12 runs per over",
          subTitle: "",
          points: "-4",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Above 12 runs per over",
          subTitle: "",
          points: "-6",
          secondaryColor: false,
        },
      ],
      additionalData: null,
    },
    {
      id: 6,
      dropDownName: "Strike Rate (Except Bowler) Points",
      dropDownSubtitle: "Min 10 Balls To Be Played",
      img: "/images/banner_13.png",
      points: [
        {
          id: 1,
          name: "Above 170 runs per 100 balls",
          subTitle: "",
          points: "+6",
          secondaryColor: true,
        },
        {
          id: 2,
          name: "Between 150.01 - 170 runs per 100 balls",
          subTitle: "",
          points: "+4",
          secondaryColor: true,
        },
        {
          id: 3,
          name: "Between 130 - 150 runs per 100 balls",
          subTitle: "",
          points: "2",
          secondaryColor: true,
        },
        {
          id: 4,
          name: "Between 60 - 70 runs per 100 balls",
          subTitle: "",
          points: "-2",
          secondaryColor: false,
        },
        {
          id: 5,
          name: "Between 50 - 59.99 runs per 100 balls",
          subTitle: "",

          points: "-4",
          secondaryColor: false,
        },
        {
          id: 6,
          name: "Below 50 runs per 100 balls",
          subTitle: "",
          points: "-6",
          secondaryColor: false,
        },
      ],
      additionalData: [
        {
          id: 1,
          description:
            "Negative points for low batting Strike Rates are only applicable for individual Strike Rates of 70 runs per 100 balls or below.",
        },
      ],
    },
  ],
};
