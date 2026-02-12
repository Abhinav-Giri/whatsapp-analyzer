const dayjs = require("dayjs");

function parseChat(content) {
  const lines = content.split("\n");

  const last7Days = [];
  const today = dayjs();

  for (let i = 6; i >= 0; i--) {
    last7Days.push(today.subtract(i, "day").format("DD/MM/YYYY"));
  }

  const activeUsersMap = {};
  const joinUsersMap = {};
  const userActiveDays = {};

  last7Days.forEach(date => {
    activeUsersMap[date] = new Set();
    joinUsersMap[date] = new Set();
  });

  lines.forEach(line => {
    const match = line.match(/^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s/);
    if (!match) return;

    const date = match[1];

    if (!last7Days.includes(date)) return;

    // Join event
    if (line.includes("joined") || line.includes("added")) {
      const user = line.split("-")[1]?.split("joined")[0]?.trim();
      if (user) joinUsersMap[date].add(user);
    }

    // Message event
    const messageMatch = line.match(/- (.*?):/);
    if (messageMatch) {
      const user = messageMatch[1].trim();
      activeUsersMap[date].add(user);

      if (!userActiveDays[user]) userActiveDays[user] = new Set();
      userActiveDays[user].add(date);
    }
  });

  const chartData = last7Days.map(date => ({
    date,
    activeUsers: activeUsersMap[date].size,
    newUsers: joinUsersMap[date].size
  }));

  const active4DaysUsers = Object.keys(userActiveDays)
    .filter(user => userActiveDays[user].size >= 4);

  return {
    chartData,
    active4DaysUsers
  };
}

module.exports = parseChat;