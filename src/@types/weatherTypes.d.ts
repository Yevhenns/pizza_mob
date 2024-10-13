type WeatherApiResponse = {
  location: {
    name: string;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: string;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
};

type FilteredApiResponse = {
  date: string;
  day: {
    avgtemp_c: string;
    condition: {
      text: string;
      icon: string;
    };
  };
}[];

type ForecastDay = {
  date: string;
  avgtemp: string;
  conditionText: string;
  icon: string;
};

type UserOrders = {
  _id: string;
  customerInfo: Info;
  order: ({_id: string} & Ordered)[];
  orderSum: number;
  createdAt: string;
};
