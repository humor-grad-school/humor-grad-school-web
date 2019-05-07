function getShortDateString(date: Date): string {
  const date1 = new Date(date);
  return `${date1.getFullYear()}.${date1.getMonth()}.${date1.getDay()}`;
}

export default function getPassedTimeString(createdAt: Date): string {
  const passedMillis = Date.now() - new Date(createdAt).getTime() - 9 * 60 * 60 * 1000;

  const second = Math.floor(passedMillis / 1000);
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  if (day >= 30) {
    return getShortDateString(createdAt);
  }
  if (day !== 0) {
    return `${day} 일 전`;
  }
  if (hour !== 0) {
    return `${hour} 시간 전`;
  }
  if (minute !== 0) {
    return `${minute} 분 전`;
  }
  return `${second} 초 전`;
}
