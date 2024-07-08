const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const data = [
    { date: "2024-05-01", count: 0, level: 4 },
    { date: "2024-05-02", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-03", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-04", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-05", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-06", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-07", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-08", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-09", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-10", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-11", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-12", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-13", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-14", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-15", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-16", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-17", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-18", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-19", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-20", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-21", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-22", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-23", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-24", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-25", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-26", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-27", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-28", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-29", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-30", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-05-31", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-01", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-02", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-03", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-04", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-05", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-06", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-07", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-08", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-09", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-10", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-11", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-12", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-13", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-14", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-15", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-16", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-17", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-18", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-19", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-20", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-21", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-22", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-23", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-24", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-25", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-26", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-27", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-28", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-29", count: getRandomInt(1, 20), level: getRandomInt(0, 4) },
    { date: "2024-06-30", count: getRandomInt(1, 20), level: getRandomInt(0, 4) }
    // { date: "2024-06-31", count: getRandomInt(1, 20), level: getRandomInt(0,4) }
];
export default data;
